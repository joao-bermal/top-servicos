from datetime import datetime

from pydantic import BaseModel


class EmpresaBase(BaseModel):
    cnpj: str
    senha: str

class EmpresaCreate(EmpresaBase):
    razao_social: str
    telefone: str
    email: str

class Empresa(EmpresaCreate):
    id: int
    class Config:
        orm_mode = True

class EmpresaNomeCnpj(BaseModel):
    razao_social: str
    cnpj: str

class FuncionarioBase(BaseModel):
    cpf: str
    senha: str
    
class FuncionarioCreate(FuncionarioBase):
    nome: str
    telefone: str
    cargo: str
    email: str

class FuncionarioUpdate(BaseModel):
    id: int
    nome: str
    cpf: str
    email: str
    telefone: str

class Funcionario(FuncionarioCreate):
    id: int
    class Config:
        orm_mode = True

class FuncionarioNomeCpf(BaseModel):
    nome: str
    cpf: str


class ProcessoBase(BaseModel):
    nome: str 
    tipo: str
    status: str
    descricao: str

class ProcessoCreate(ProcessoBase):
    empresa_cnpj: str
    funcionario_cpf: str

class Processo(ProcessoBase):
    id: int
    time_created: datetime
    empresa_cnpj: str
    funcionario_cpf: str
    
    class Config:
        orm_mode = True

class ProcessoUpdate(BaseModel):
    # response_type: str
    updated_field: str
    updated_value: str

# class ProcessoDelete(BaseModel):
#     response_type: str

class ForgotPassword(BaseModel):
    user_type: str
    email: str

class ResetPassword(ForgotPassword):
    reset_code: str
    new_password: str

class UserUpdatePass(BaseModel):
    id: int
    new_password: str
    user_type: str