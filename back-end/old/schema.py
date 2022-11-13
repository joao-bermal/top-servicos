from pydantic import BaseModel


class Empresa(BaseModel):
    cnpj: str
    razao_social: str
    telefone: str
    email: str
    senha: str

    class Config:
        orm_mode = True


class Funcionario(BaseModel):
    cpf: str
    nome: str
    telefone: str
    cargo: str
    email: str
    senha: str

    class Config:
        orm_mode = True


class Processo(BaseModel):
    nome: str
    tipo: str
    status: str
    descricao: str
    empresa_cnpj: str
    funcionario_cpf: str

    class Config:
        orm_mode = True
