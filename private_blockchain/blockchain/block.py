import hashlib

class Block:
    def __init__(self, block_id, feature_map, encryption_key, data, timestamp, previous_hash, owner_org, clients, nonce=0):
        self.block_id = block_id
        self.feature_map = feature_map
        self.encryption_key = encryption_key
        self.data = data
        self.timestamp = timestamp
        self.previous_hash = previous_hash
        self.owner_org = owner_org
        self.clients = clients
        self.nonce = nonce
        self.hash = self.compute_hash()

    def compute_hash(self):
        data = (
            str(self.block_id) + str(self.feature_map) + str(self.encryption_key) +
            str(self.data) + str(self.timestamp) + str(self.previous_hash) +
            str(self.owner_org) + str(self.clients) + str(self.nonce)
        )
        return hashlib.sha256(data.encode()).hexdigest()

    def proof_of_work(self, difficulty):
        self.nonce = 0
        computed_hash = self.compute_hash()
        while not computed_hash.startswith('0' * difficulty):
            self.nonce += 1
            computed_hash = self.compute_hash()
        return computed_hash
