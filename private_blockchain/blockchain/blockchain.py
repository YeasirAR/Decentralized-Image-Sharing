import sqlite3
from datetime import datetime
from blockchain.block import Block
import threading
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

class Blockchain:
    def __init__(self, difficulty=2, db_name='blockchain.db'):
        self.difficulty = difficulty
        self.db_name = db_name
        self.local = threading.local()
        self.create_table()
        self.load_chain()

    def get_connection(self):
        if not hasattr(self.local, 'conn'):
            self.local.conn = sqlite3.connect(self.db_name, check_same_thread=False)
        return self.local.conn

    def create_table(self):
        conn = self.get_connection()
        with conn:
            conn.execute('''CREATE TABLE IF NOT EXISTS blocks
                            (block_id INTEGER PRIMARY KEY, feature_map TEXT, encryption_key TEXT, data TEXT, timestamp TEXT, previous_hash TEXT, owner_org TEXT, clients TEXT, nonce INTEGER, hash TEXT)''')

    def create_genesis_block(self):
        logging.info("Creating genesis block...")
        genesis_block = Block(0, "", "", "", datetime.now().isoformat(), "0", "", [])
        genesis_block.hash = genesis_block.proof_of_work(self.difficulty)
        self.add_block_to_db(genesis_block)
        logging.info("Genesis block created with hash: %s", genesis_block.hash)

    def get_latest_block(self):
        conn = self.get_connection()
        cursor = conn.execute('SELECT * FROM blocks ORDER BY block_id DESC LIMIT 1')
        block_data = cursor.fetchone()
        return self.create_block_from_data(block_data) if block_data else None

    def add_block(self, feature_map, encryption_key, data, owner_org, clients):
        previous_block = self.get_latest_block()
        block_id = previous_block.block_id + 1 if previous_block else 0
        timestamp = datetime.now().isoformat()
        previous_hash = previous_block.hash if previous_block else "0"
        new_block = Block(block_id, feature_map, encryption_key, data, timestamp, previous_hash, owner_org, clients)
        new_block.hash = new_block.proof_of_work(self.difficulty)
        if self.is_valid_new_block(new_block, previous_block):
            self.add_block_to_db(new_block)
            return True
        return False

    def add_block_to_db(self, block):
        conn = self.get_connection()
        with conn:
            conn.execute('INSERT INTO blocks (block_id, feature_map, encryption_key, data, timestamp, previous_hash, owner_org, clients, nonce, hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                         (block.block_id, block.feature_map, block.encryption_key, block.data, block.timestamp, block.previous_hash, block.owner_org, ','.join(block.clients), block.nonce, block.hash))

    def get_block(self, block_id):
        conn = self.get_connection()
        cursor = conn.execute('SELECT * FROM blocks WHERE block_id=?', (block_id,))
        block_data = cursor.fetchone()
        return self.create_block_from_data(block_data)

    def create_block_from_data(self, block_data):
        if block_data:
            return Block(block_data[0], block_data[1], block_data[2], block_data[3], block_data[4], block_data[5], block_data[6], block_data[7].split(','), block_data[8])

    def is_valid_new_block(self, new_block, previous_block):
        if previous_block is None:
            return True
        if new_block.previous_hash != previous_block.hash:
            return False
        if new_block.hash != new_block.compute_hash():
            return False
        if not new_block.hash.startswith('0' * self.difficulty):
            return False
        return True

    def is_chain_valid(self):
        conn = self.get_connection()
        cursor = conn.execute('SELECT * FROM blocks')
        blocks = cursor.fetchall()
        previous_block = None
        for block_data in blocks:
            current_block = self.create_block_from_data(block_data)
            if previous_block and not self.is_valid_new_block(current_block, previous_block):
                return False
            previous_block = current_block
        return True

    def load_chain(self):
        conn = self.get_connection()
        cursor = conn.execute('SELECT * FROM blocks ORDER BY block_id')
        blocks = cursor.fetchall()
        if not blocks:
            logging.info("No blocks found. Creating genesis block...")
            self.create_genesis_block()
        else:
            for block_data in blocks:
                block = self.create_block_from_data(block_data)
                logging.info(f'Loaded block {block.block_id} with hash: {block.hash}')
