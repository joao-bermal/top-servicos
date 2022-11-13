from pydantic import BaseModel


class EmpresaBase(BaseModel):
    cnpj: str
    senha: str

class EmpresaCreate(EmpresaBase):
    # colocar a senha aqui para que se possa processar (encriptar)
    razao_social: str
    telefone: str
    email: str

class Empresa(EmpresaCreate):
    class Config:
        orm_mode = True

class FuncionarioBase(BaseModel):
    cpf: str
    senha: str
    
class FuncionarioCreate(FuncionarioBase):
    # colocar a senha aqui para que se possa processar (encriptar)
    nome: str
    telefone: str
    cargo: str
    email: str

class Funcionario(FuncionarioCreate):
    class Config:
        orm_mode = True

class ProcessoBase(BaseModel):
    nome: str
    tipo: str
    status: str
    descricao: str

class ProcessoCreate(ProcessoBase):
    empresa_cnpj: str
    funcionario_cpf: str

class Processo(ProcessoBase):
    empresa_id: int
    funcionario_id: int
    
    class Config:
        orm_mode = True

