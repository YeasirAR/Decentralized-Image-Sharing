import json
from datetime import datetime
from block import Block

class Blockchain:
    def __init__(self, difficulty=2):
        self.chain = []
        self.difficulty = difficulty
        self.load_chain()

    def create_genesis_block(self):
        genesis_block = Block(0, "", "", "", datetime.now().isoformat(), "0", "", [])
        genesis_block.hash = genesis_block.proof_of_work(self.difficulty)
        self.chain.append(genesis_block)

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, feature_map, encryption_key, ipfs_hash, owner_org, clients):
        previous_block = self.get_latest_block()
        block_id = previous_block.block_id + 1
        timestamp = datetime.now().isoformat()
        previous_hash = previous_block.hash
        new_block = Block(block_id, feature_map, encryption_key, ipfs_hash, timestamp, previous_hash, owner_org, clients)
        new_block.hash = new_block.proof_of_work(self.difficulty)
        if self.is_valid_new_block(new_block, previous_block):
            self.chain.append(new_block)
            self.save_chain()
            return True
        return False

    def get_block(self, block_id):
        for block in self.chain:
            if block.block_id == block_id:
                return block
        return None

    def is_valid_new_block(self, new_block, previous_block):
        if new_block.previous_hash != previous_block.hash:
            return False
        if new_block.hash != new_block.compute_hash():
            return False
        if not new_block.hash.startswith('0' * self.difficulty):
            return False
        return True

    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]
            if not self.is_valid_new_block(current_block, previous_block):
                return False
        return True

    def save_chain(self):
        with open('blockchain/blockchain.json', 'w') as f:
            json.dump([block.__dict__ for block in self.chain], f, indent=4)

    def load_chain(self):
        try:
            with open('blockchain/blockchain.json', 'r') as f:
                chain_data = json.load(f)
                self.chain = []
                for block_data in chain_data:
                    block = Block(
                        block_data['block_id'],
                        block_data['feature_map'],
                        block_data['encryption_key'],
                        block_data['ipfs_hash'],
                        block_data['timestamp'],
                        block_data['previous_hash'],
                        block_data['owner_org'],
                        block_data['clients'],
                        block_data['nonce']
                    )
                    block.hash = block_data['hash']
                    self.chain.append(block)
        except (FileNotFoundError, json.JSONDecodeError):
            self.create_genesis_block()
            self.save_chain()
