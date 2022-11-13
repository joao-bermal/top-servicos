from sqlalchemy.orm import Session

import models
import schemas


def get_empresas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Empresa).offset(skip).limit(limit).all()

def get_funcionarios(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Funcionario).offset(skip).limit(limit).all()

def get_processos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Processo).offset(skip).limit(limit).all()


def get_empresa_id_by_cnpj(db: Session, cnpj: str):
    return db.query(models.Empresa).filter(models.Empresa.cnpj == cnpj).first().id
    
def get_funcionario_id_by_cpf(db: Session, cpf: str):
    return db.query(models.Funcionario).filter(models.Funcionario.cpf == cpf).first().id

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

def create_processo(db: Session, processo: schemas.ProcessoCreate, empresa_id: int, funcionario_id: int):
    db_processo = models.Processo(
        nome=processo.nome,
        tipo=processo.tipo,
        status=processo.status,
        descricao=processo.descricao,
        empresa_id=empresa_id,
        funcionario_id=funcionario_id,
    )
    db.add(db_processo)
    db.commit()
    db.refresh(db_processo)
    return db_processo
