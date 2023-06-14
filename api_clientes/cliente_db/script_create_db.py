import sqlite3

DATABASE = 'clientes.db'

# Cria a tabela 'clientes' no banco de dados
def create_table():
    db = sqlite3.connect(DATABASE)
    cursor = db.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf TEXT NOT NULL
        )
    ''')
    db.commit()
    db.close()

# Inserir clientes iniciais no banco de dados
def insert_clientes_iniciais():
    db = sqlite3.connect(DATABASE)
    cursor = db.cursor()
    cursor.executemany('INSERT INTO clientes (nome, cpf) VALUES (?, ?)', [
        ('Cliente 1', '11111111111'),
        ('Cliente 2', '22222222222'),
        ('Cliente 3', '33333333333')
    ])
    db.commit()
    db.close()

if __name__ == '__main__':
    create_table()
    insert_clientes_iniciais()