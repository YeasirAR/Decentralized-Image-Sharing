from flask import Flask, request, jsonify, g
from cryptography.fernet import Fernet
from blockchain.blockchain import Blockchain
from blockchain.smartcontract import SmartContract
from flask_cors import CORS
import threading
from p2p_node import P2PNode

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
encryption = Fernet(Fernet.generate_key())

# Initialize Blockchain and SmartContract
blockchain = Blockchain()
smartcontract = SmartContract(blockchain)

# Initialize P2P Node
p2p_node = P2PNode()

# Start P2P node in a separate thread
threading.Thread(target=p2p_node.start_server).start()

@app.before_request
def before_request():
    g.blockchain_conn = blockchain.get_connection()

@app.teardown_appcontext
def close_connection(exception):
    conn = getattr(g, 'blockchain_conn', None)
    if conn is not None:
        conn.close()

@app.route('/api/insertEncrKeyIpfs', methods=['POST'])
def insertEncrKeyIpfs():
    try:
        data = request.json
        owner_org = data['owner']
        encryption_key = data['encryption_key']
        feature_map = data['feature_map']
        data_field = data['data']
        clients = data['clients'].split(',')

        status = blockchain.add_block(feature_map, encryption_key, data_field, owner_org, clients)
        if status:
            new_block = blockchain.get_latest_block()
            p2p_node.broadcast_block(new_block)
        return jsonify({'message': 'Block added successfully' if status else 'Failed to add block'})
    except KeyError:
        return jsonify({'message': 'Invalid request data'}), 400

@app.route('/api/getEncrKeyIpfs', methods=['POST'])
def getEncrKeyIpfs():
    try:
        data = request.json
        block_id = data['block_id']
        client = data['client']
        access = smartcontract.check_contract(block_id, client)
        if access:
            block = blockchain.get_block(block_id)
            if block:
                return jsonify({'encryption_key': block.encryption_key, 'data': block.data})
        return jsonify({'message': 'Access Denied'})
    except KeyError:
        return jsonify({'message': 'Invalid request data'}), 400

@app.route('/api/getAllBlockInfo', methods=['POST'])
def getAllBlockInfo():
    try:
        blocks = [
            {
                'block_id': block.block_id,
                'feature_map': block.feature_map,
                'encryption_key': block.encryption_key,
                'data': block.data,
                'timestamp': block.timestamp,
                'previous_hash': block.previous_hash,
                'owner_org': block.owner_org,
                'clients': block.clients,
                'hash': block.hash
            }
            for block in blockchain.chain
        ]
        return jsonify({'blocks': blocks})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/api/getClientsBlocks', methods=['POST'])
def getClientsBlocks():
    try:
        client = request.json['client']
        blocks = [
            {
                'block_id': block.block_id,
                'feature_map': block.feature_map,
                'encryption_key': block.encryption_key,
                'data': block.data,
                'timestamp': block.timestamp,
                'previous_hash': block.previous_hash,
                'owner_org': block.owner_org,
                'clients': block.clients,
                'hash': block.hash
            }
            for block in blockchain.chain
            if client in block.clients and smartcontract.check_contract(block.block_id, client)
        ]
        return jsonify({'blocks': blocks})
    except KeyError:
        return jsonify({'message': 'Invalid request data'}), 400

@app.route('/api/getOwnBlock', methods=['POST'])
def getOwnBlock():
    try:
        client = request.json['client']
        blocks = [
            {
                'block_id': block.block_id,
                'feature_map': block.feature_map,
                'encryption_key': block.encryption_key,
                'data': block.data,
                'timestamp': block.timestamp,
                'previous_hash': block.previous_hash,
                'owner_org': block.owner_org,
                'clients': block.clients,
                'hash': block.hash
            }
            for block in blockchain.chain
            if client == block.owner_org and smartcontract.check_owner_contract(block.block_id, client)
        ]
        return jsonify({'blocks': blocks})
    except KeyError:
        return jsonify({'message': 'Invalid request data'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
