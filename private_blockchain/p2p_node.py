import socket
import ssl
import threading
import json
from blockchain.blockchain import Blockchain
from blockchain.block import Block
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class P2PNode:
    def __init__(self, host='127.0.0.1', port=5001):  # Change port to 5001
        self.host = host
        self.port = port
        self.blockchain = Blockchain()
        self.peers = []

    def start_server(self):
        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server = ssl.wrap_socket(server, keyfile='certs/node.key', certfile='certs/node.crt', server_side=True)
        server.bind((self.host, self.port))
        server.listen(5)
        logging.info(f'Server started on {self.host}:{self.port}')

        while True:
            client_socket, addr = server.accept()
            logging.info(f'Connection from {addr}')
            client_handler = threading.Thread(
                target=self.handle_client, args=(client_socket,)
            )
            client_handler.start()

    def handle_client(self, client_socket):
        try:
            with client_socket:
                data = client_socket.recv(1024)
                if not data:
                    return
                message = json.loads(data.decode('utf-8'))
                self.process_message(message, client_socket)
        except Exception as e:
            logging.error(f"Error handling client: {e}")

    def process_message(self, message, client_socket):
        if message['type'] == 'new_block':
            block_data = message['block']
            new_block = Block(
                block_data['block_id'],
                block_data['feature_map'],
                block_data['encryption_key'],
                block_data['data'],
                block_data['timestamp'],
                block_data['previous_hash'],
                block_data['owner_org'],
                block_data['clients'],
                block_data['nonce']
            )
            if self.blockchain.is_valid_new_block(new_block, self.blockchain.get_latest_block()):
                self.blockchain.add_block_to_db(new_block)
                self.broadcast_block(new_block)
                client_socket.sendall(b'Block accepted')
            else:
                client_socket.sendall(b'Block rejected')

    def broadcast_block(self, block):
        for peer in self.peers:
            self.send_block_to_peer(block, peer)

    def send_block_to_peer(self, block, peer):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                sock = ssl.wrap_socket(sock)
                sock.connect(peer)
                message = json.dumps({
                    'type': 'new_block',
                    'block': block.__dict__
                }).encode('utf-8')
                sock.sendall(message)
        except Exception as e:
            logging.error(f"Error sending block to peer {peer}: {e}")

    def connect_to_peer(self, peer):
        self.peers.append(peer)
        self.request_chain(peer)

    def request_chain(self, peer):
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
                sock = ssl.wrap_socket(sock)
                sock.connect(peer)
                message = json.dumps({
                    'type': 'request_chain'
                }).encode('utf-8')
                sock.sendall(message)
                data = sock.recv(1024)
                chain = json.loads(data.decode('utf-8'))
                if len(chain) > len(self.blockchain.chain):
                    for block_data in chain:
                        block = Block(
                            block_data['block_id'],
                            block_data['feature_map'],
                            block_data['encryption_key'],
                            block_data['data'],
                            block_data['timestamp'],
                            block_data['previous_hash'],
                            block_data['owner_org'],
                            block_data['clients'],
                            block_data['nonce']
                        )
                        self.blockchain.add_block_to_db(block)
        except Exception as e:
            logging.error(f"Error requesting chain from peer {peer}: {e}")

if __name__ == '__main__':
    node = P2PNode()
    node.start_server()
