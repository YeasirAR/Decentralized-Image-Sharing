from flask import Flask, request, jsonify
from cryptography.fernet import Fernet
from blockchain import Blockchain
from smartcontract import SmartContract
from flask_cors import CORS  

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
encryption = Fernet(Fernet.generate_key())

blockchain = Blockchain()
smartcontract = SmartContract(blockchain)

@app.route('/api/insertEncrKeyIpfs', methods=['POST'])
def insertEncrKeyIpfs():
    try:
        data = request.json
        owner_org = data['owner']
        encryption_key = data['encryption_key']
        feature_map = data['feature_map']
        ipfs_hash = data['ipfs_hash']
        clients = data['clients'].split(',')
        status = blockchain.add_block(feature_map, encryption_key, ipfs_hash, owner_org, clients)
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
                return jsonify({'encryption_key': block.encryption_key, 'ipfs_hash': block.ipfs_hash})
        return jsonify({'message': 'Access Denied'})
    except KeyError:
        return jsonify({'message': 'Invalid request data'}), 400

@app.route('/api/getAllBlockInfo', methods=['POST'])
def getAllBlockInfo():
    blocks = [
        {
            'block_id': block.block_id,
            'feature_map': block.feature_map,
            'encryption_key': block.encryption_key,
            'ipfs_hash': block.ipfs_hash,
            'timestamp': block.timestamp,
            'previous_hash': block.previous_hash,
            'owner_org': block.owner_org,
            'clients': block.clients,
            'hash': block.hash
        }
        for block in blockchain.chain
    ]
    return jsonify({'blocks': blocks})

@app.route('/api/getClientsBlocks', methods=['POST'])
def getClientsBlocks():
    try:
        client = request.json['client']
        blocks = [
            {
                'block_id': block.block_id,
                'feature_map': block.feature_map,
                'encryption_key': block.encryption_key,
                'ipfs_hash': block.ipfs_hash,
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
                'ipfs_hash': block.ipfs_hash,
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
    app.run(debug=True, port=5000)
