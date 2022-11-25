from typing import List

from sqlalchemy import delete, insert, or_, update, values
from sqlalchemy.orm import Session

import models
import schemas


def get_empresas(db: Session):
    return db.query(models.Empresa).order_by(models.Empresa.id).all()

def get_empresas_nome_cnpj(db: Session):
    return db.query(models.Empresa.razao_social, models.Empresa.cnpj).order_by(models.Empresa.id).all()

def get_funcionarios(db: Session):
    return db.query(models.Funcionario).order_by(models.Funcionario.id).all()

def get_advogados_nome_cpf(db: Session):
    return db.query(models.Funcionario.nome, models.Funcionario.cpf).filter(models.Funcionario.cargo == "Advogado").order_by(models.Funcionario.id).all()

def get_processos(db: Session):
    return db.query(models.Processo).order_by(models.Processo.id).all()

def get_processos_em_andamento(db: Session):
    return db.query(models.Processo).filter(or_(models.Processo.status == "Aberto", models.Processo.status == "Em andamento")).order_by(models.Processo.id).all()
    
def get_processos_finalizados(db: Session):
    return db.query(models.Processo).filter(or_(models.Processo.status == "Concluído", models.Processo.status == "Arquivado")).order_by(models.Processo.id).all()


def get_dados_empresa_by_cnpj(db: Session, cnpj: str):
    return db.query(models.Empresa).filter(models.Empresa.cnpj == cnpj).first()
    
def get_dados_funcionario_by_cpf(db: Session, cpf: str):
    return db.query(models.Funcionario).filter(models.Funcionario.cpf == cpf).first()

def get_empresa_by_cnpj(db: Session, cnpj: str):
    return db.query(models.Empresa).filter(models.Empresa.cnpj == cnpj).first()

def get_empresa_by_id(db: Session, id: int):
    return db.query(models.Empresa).filter(models.Empresa.id == id).first()
    
def get_funcionario_by_cpf(db: Session, cpf: str):
    return db.query(models.Funcionario).filter(models.Funcionario.cpf == cpf).first()

def get_funcionario_by_id(db: Session, id: int):
    return db.query(models.Funcionario).filter(models.Funcionario.id == id).first()

def check_email_exists(db: Session, request: schemas.ForgotPassword):
    user_type = request.user_type
    if user_type == "Funcionario":
        return db.query(models.Funcionario).filter(models.Funcionario.email == request.email).first()
    
    return db.query(models.Empresa).filter(models.Empresa.email == request.email).first()

def authenticate_empresa(cnpj: str, senha: str, db: Session):
    user = get_empresa_by_cnpj(cnpj=cnpj, db=db)
    if not user:
        return None
    if not user.senha == senha:
        return None
    return user

def authenticate_funcionario(cpf: str, senha: str, db: Session):
    user = get_funcionario_by_cpf(cpf=cpf, db=db)
    if not user:
        return None
    if not user.senha == senha:
        return None
    return user


def create_empresa(db: Session, empresa: schemas.EmpresaCreate):
    db_empresa = models.Empresa(
        cnpj=empresa.cnpj,
        razao_social=empresa.razao_social,
        telefone=empresa.telefone,
        email=empresa.email,
        senha=empresa.senha,
    )
    db.add(db_empresa)
    db.commit()
    db.refresh(db_empresa)
    return db_empresa

def create_funcionario(db: Session, funcionario: schemas.FuncionarioCreate):
    db_funcionario = models.Funcionario(
        cpf=funcionario.cpf,
        nome=funcionario.nome,
        telefone=funcionario.telefone,
        cargo=funcionario.cargo,
        email=funcionario.email,
        senha=funcionario.senha,
    )
    db.add(db_funcionario)
    db.commit()
    db.refresh(db_funcionario)
    return db_funcionario


def create_processo(db: Session, processo: schemas.ProcessoCreate):
    db_processo = models.Processo(
        nome=processo.nome,
        tipo=processo.tipo,
        status=processo.status,
        descricao=processo.descricao,
        empresa_cnpj=processo.empresa_cnpj,
        funcionario_cpf=processo.funcionario_cpf,
    )
    db.add(db_processo)
    db.commit()
    db.refresh(db_processo)
    return db_processo

def update_funcionario(db: Session, funcionario: schemas.FuncionarioUpdate):
    db.execute(
        update(models.Funcionario)
        .where(models.Funcionario.id == funcionario.id)
        .values(nome = funcionario.nome, cpf = funcionario.cpf, email = funcionario.email, telefone = funcionario.telefone)
    )
    db.commit()
    return {"Message": "Funcionario successfully updated"}

def update_processo(db: Session, processo: schemas.ProcessoUpdate, id: str):
    if processo.updated_field == "nome":
        db.execute(
            update(models.Processo)
            .where(models.Processo.id == id)
            .values(nome = processo.updated_value)
        )
    elif processo.updated_field == "tipo":
        db.execute(
            update(models.Processo)
            .where(models.Processo.id == id)
            .values(tipo = processo.updated_value)
        )
    elif processo.updated_field == "status":
        db.execute(
            update(models.Processo)
            .where(models.Processo.id == id)
            .values(status = processo.updated_value)
        )
    elif processo.updated_field == "descricao":
        db.execute(
            update(models.Processo)
            .where(models.Processo.id == id)
            .values(descricao = processo.updated_value)
        )
    elif processo.updated_field == "empresa_cnpj":
        db.execute(
            update(models.Processo)
            .where(models.Processo.id == id)
            .values(empresa_cnpj = processo.updated_value)
        )
    elif processo.updated_field == "funcionario_cpf":
        db.execute(
            update(models.Processo)
            .where(models.Processo.id == id)
            .values(funcionario_cpf = processo.updated_value)
        )
    
    db.commit()
    return get_processos(db=db)

def delete_processo(db: Session, id: str):
    db.execute(delete(models.Processo).where(models.Processo.id == id))
    db.commit()
    return get_processos(db=db)

def delete_processos(db: Session, listProcessos: List[int]):
    db.execute(delete(models.Processo).where(models.Processo.id.in_(listProcessos)))
    db.commit()
    
    return get_processos(db=db)

def create_reset_code(db: Session, email: str, reset_code: str):
    db.execute(insert(models.ForgotPassword).values(email = email, reset_code = reset_code, status = "1"))
    db.commit()

    return {"message": "reset code successfully created"}

def verify_reset_code(db: Session, reset_code: str):
    response = db.query(models.ForgotPassword).filter(models.ForgotPassword.reset_code == reset_code).first()
    if response:
        return True
    return False

def reset_password(db: Session, request: schemas.ResetPassword):
    if request.user_type == "Empresa":
        db.execute(update(models.Empresa).where(models.Empresa.email == request.email).values(senha=request.new_password))
    else:
        db.execute(update(models.Funcionario).where(models.Funcionario.email == request.email).values(senha=request.new_password))
    db.commit()
    return {"message": "password successfully changed!"}

def update_password(db: Session, request: schemas.UserUpdatePass):
    if request.user_type == "Empresa":
        db.execute(update(models.Empresa).where(models.Empresa.id == request.id).values(senha=request.new_password))
    else:
        db.execute(update(models.Funcionario).where(models.Funcionario.id == request.id).values(senha=request.new_password))
    db.commit()
    return {"message": "password successfully changed!"}
