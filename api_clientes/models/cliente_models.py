class Cliente:
    def __init__(self, id=None, nome=None, cpf=None):
        self.id =id
        self.nome = nome
        self.cpf = cpf

    def __str__(self):
        return {"id": self.id, "nome": self.nome, "cpf": self.cpf}