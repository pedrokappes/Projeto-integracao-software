class Banco:
    def __init__(self):
        self.clientes = []
        self.cont = 0

    def listar(self):
        return {"clientes": self.clientes}
    
    def buscar(self, id):
        for cliente in self.clientes:
            if cliente["id"] == id:
                return {"cliente": cliente}
        return {"mensagem": "Cliente não encontrado"}
    
    def cadastrar(self, cliente):
        if ("nome" not in cliente or "cpf" not in cliente):
            return {"mensage": "Está faltando parametro"}
        cliente["id"] = self.cont+1
        self.cont = self.cont+1
        self.clientes.append(cliente)
        return {"cliente": cliente}
    
    def alterar(self, id, clienteAlterado):
        for cliente in self.clientes:
            if cliente["id"] == id:
                cliente.update(clienteAlterado)
                return {"cliente": cliente}
        return {"mensagem": "Cliente não encontrado"}
    
    def excluir(self, id):
        for index, cliente in enumerate(self.clientes):
            if cliente["id"] == id:
                self.clientes.pop(index)
                return {"mensagem": "Cliente excluido com sucesso"}
        return {"mensagem": "Cliente não encontrado"}
