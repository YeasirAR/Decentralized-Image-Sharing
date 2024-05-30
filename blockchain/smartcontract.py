class SmartContract:
    def __init__(self, blockchain):
        self.blockchain = blockchain

    def check_contract(self, block_id, client):
        block = self.blockchain.get_block(block_id)
        if not block:
            return False
        if client in block.clients:
            return True
        return False

    def check_owner_contract(self, block_id, owner):
        block = self.blockchain.get_block(block_id)
        if not block:
            return False
        if owner == block.owner_org:
            return True
        return False
