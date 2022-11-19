from typing import List

from sqlalchemy import delete, or_, update, values
from sqlalchemy.orm import Session

import models
import schemas


def get_empresas(db: Session):
    return db.query(models.Empresa).order_by(models.Empresa.id).all()

def get_funcionarios(db: Session):
    return db.query(models.Funcionario).order_by(models.Funcionario.id).all()

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
    
def get_funcionario_by_cpf(db: Session, cpf: str):
    return db.query(models.Funcionario).filter(models.Funcionario.cpf == cpf).first()

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
    dadosEmpresa = get_dados_empresa_by_cnpj(db, cnpj=processo.empresa_cnpj)
    dadosFuncionario = get_dados_funcionario_by_cpf(db, cpf=processo.funcionario_cpf)
    print(dadosEmpresa)
    print(dadosFuncionario)
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
    if processo.response_type == "finalizados":
        return get_processos_finalizados(db=db)
    
    return get_processos_em_andamento(db=db)

def delete_processo(db: Session, id: str, processo: schemas.ProcessoDelete):
    db.execute(delete(models.Processo).where(models.Processo.id == id))
    db.commit()
    if processo.response_type == "finalizados":
        return get_processos_finalizados(db=db)

    return get_processos_em_andamento(db=db)

def delete_processos(db: Session, listProcessos: List[int]):
    db.execute(delete(models.Processo).where(models.Processo.id.in_(listProcessos)))
    db.commit()
    
    return get_processos_finalizados(db=db)