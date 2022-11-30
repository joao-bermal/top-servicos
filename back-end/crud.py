from typing import List

from sqlalchemy import and_, delete, insert, or_, update, values
from sqlalchemy.orm import Session

import models
import schemas


def check_email_funcionario(db: Session, email: str):
    email = db.query(models.Funcionario).filter(models.Funcionario.email == email).first()
    if not email:
        return False
    return True

def check_email_empresa(db: Session, email: str):
    email = db.query(models.Empresa).filter(models.Empresa.email == email).first()
    if not email:
        return False
    return True

def get_all_empresas_info(db: Session):
    return db.query(models.Empresa).order_by(models.Empresa.id).all()

def get_empresa_cnpj_by_id(db: Session, id: int):
    return db.query(models.Empresa.cnpj).filter(models.Empresa.id == id).order_by(models.Empresa.id).first().cnpj

def get_empresas_nome_cnpj(db: Session):
    return db.query(models.Empresa.razao_social, models.Empresa.cnpj).order_by(models.Empresa.id).all()

def get_funcionarios(db: Session):
    return db.query(models.Funcionario).order_by(models.Funcionario.id).all()

def get_funcionario_cpf_by_id(db: Session, id: int):
    return db.query(models.Funcionario).filter(models.Funcionario.id == id).order_by(models.Funcionario.id).first().cpf

def get_advogados(db: Session):
    return db.query(models.Funcionario.id, models.Funcionario.nome, models.Funcionario.cpf, models.Funcionario.email, models.Funcionario.telefone).filter(models.Funcionario.cargo == "Advogado").order_by(models.Funcionario.id).all()

def get_advogados_nome_cpf(db: Session):
    return db.query(models.Funcionario.nome, models.Funcionario.cpf).filter(models.Funcionario.cargo == "Advogado").order_by(models.Funcionario.id).all()

def get_all_advogados_info(db: Session):
    return db.query(models.Funcionario).filter(models.Funcionario.cargo == "Advogado").order_by(models.Funcionario.id).all()

def get_processos(db: Session):
    return db.query(models.Processo).order_by(models.Processo.id).all()

def get_processos_em_andamento(db: Session):
    return db.query(models.Processo).filter(or_(models.Processo.status == "Aberto", models.Processo.status == "Em andamento")).order_by(models.Processo.id).all()

def get_processos_em_andamento_by_cnpj(db: Session, empresa_cnpj: str):
    return db.query(models.Processo).filter(and_(models.Processo.empresa_cnpj == empresa_cnpj, or_(models.Processo.status == "Aberto", models.Processo.status == "Em andamento"))).order_by(models.Processo.id).all()

def get_processos_em_andamento_by_cpf(db: Session, advogado_cpf: str):
    return db.query(models.Processo).filter(and_(models.Processo.funcionario_cpf == advogado_cpf, or_(models.Processo.status == "Aberto", models.Processo.status == "Em andamento"))).order_by(models.Processo.id).all()
    
def get_processos_finalizados(db: Session):
    return db.query(models.Processo).filter(or_(models.Processo.status == "Concluído", models.Processo.status == "Arquivado")).order_by(models.Processo.id).all()

def get_processos_finalizados_by_cnpj(db: Session, empresa_cnpj: str):
    return db.query(models.Processo).filter(and_(models.Processo.empresa_cnpj == empresa_cnpj, or_(models.Processo.status == "Concluído", models.Processo.status == "Arquivado"))).order_by(models.Processo.id).all()

def get_processos_finalizados_by_cpf(db: Session, advogado_cpf: str):
    return db.query(models.Processo).filter(and_(models.Processo.funcionario_cpf == advogado_cpf, or_(models.Processo.status == "Concluído", models.Processo.status == "Arquivado"))).order_by(models.Processo.id).all()

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

def get_email_by_cpf(db: Session, cpf: str):
    return db.query(models.Funcionario.email).filter(models.Funcionario.cpf == cpf).first().email

def get_email_by_cnpj(db: Session, cnpj: str):
    return db.query(models.Empresa.email).filter(models.Empresa.cnpj == cnpj).first().email

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

def update_empresa_all_fields(db: Session, empresa: schemas.EmpresaUpdate):
    db.execute(
        update(models.Empresa)
        .where(models.Empresa.id == empresa.id)
        .values(razao_social = empresa.razao_social, cnpj = empresa.cnpj, email = empresa.email, telefone = empresa.telefone)
    )
    db.commit()
    return {"Message": "Funcionario successfully updated"}

def update_processo(db: Session, processo: schemas.ProcessoUpdate, id: int):
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

def update_advogado(db: Session, advogado: schemas.ProcessoUpdate, id: int):
    if advogado.updated_field == "nome":
        db.execute(
            update(models.Funcionario)
            .where(models.Funcionario.id == id)
            .values(nome = advogado.updated_value)
        )
    elif advogado.updated_field == "email":
        db.execute(
            update(models.Funcionario)
            .where(models.Funcionario.id == id)
            .values(email = advogado.updated_value)
        )
    elif advogado.updated_field == "telefone":
        db.execute(
            update(models.Funcionario)
            .where(models.Funcionario.id == id)
            .values(telefone = advogado.updated_value)
        )
    elif advogado.updated_field == "senha":
        db.execute(
            update(models.Funcionario)
            .where(models.Funcionario.id == id)
            .values(senha = advogado.updated_value)
        )
    
    db.commit()
    return get_all_advogados_info(db=db)

def update_empresa(db: Session, empresa: schemas.ProcessoUpdate, id: int):
    if empresa.updated_field == "razao_social":
        db.execute(
            update(models.Empresa)
            .where(models.Empresa.id == id)
            .values(razao_social = empresa.updated_value)
        )
    elif empresa.updated_field == "email":
        db.execute(
            update(models.Empresa)
            .where(models.Empresa.id == id)
            .values(email = empresa.updated_value)
        )
    elif empresa.updated_field == "telefone":
        db.execute(
            update(models.Empresa)
            .where(models.Empresa.id == id)
            .values(telefone = empresa.updated_value)
        )
    elif empresa.updated_field == "senha":
        db.execute(
            update(models.Empresa)
            .where(models.Empresa.id == id)
            .values(senha = empresa.updated_value)
        )
    
    db.commit()
    return get_all_empresas_info(db=db)

def delete_processo(db: Session, id: int):
    db.execute(delete(models.Processo).where(models.Processo.id == id))
    db.commit()
    return get_processos(db=db)

def delete_processos(db: Session, listProcessos: List[int]):
    db.execute(delete(models.Processo).where(models.Processo.id.in_(listProcessos)))
    db.commit()
    
    return get_processos(db=db)

def delete_advogado(db: Session, id: int):
    db.execute(delete(models.Funcionario).where(models.Funcionario.id == id))
    db.commit()
    return get_all_advogados_info(db=db)

def delete_advogados(db: Session, listAdvogados: List[int]):
    db.execute(delete(models.Funcionario).where(models.Funcionario.id.in_(listAdvogados)))
    db.commit()
    
    return get_all_advogados_info(db=db)

def create_reset_code(db: Session, email: str, reset_code: str):
    db.execute(insert(models.ForgotPassword).values(email = email, reset_code = reset_code))
    db.commit()

    return {"message": "reset code successfully created"}

def verify_reset_code(db: Session, reset_code: str):
    return db.query(models.ForgotPassword.email).filter(models.ForgotPassword.reset_code == reset_code).first().email

def reset_password(db: Session, email: str, new_password: str):
    if check_email_empresa(db=db, email=email):
        db.execute(update(models.Empresa).where(models.Empresa.email == email).values(senha=new_password))
    elif check_email_funcionario(db=db, email=email):
        db.execute(update(models.Funcionario).where(models.Funcionario.email == email).values(senha=new_password))

    db.commit()
    return {"message": "password successfully changed!"}

def update_password(db: Session, request: schemas.UserUpdatePass):
    if request.user_type == "Empresa":
        db.execute(update(models.Empresa).where(models.Empresa.id == request.id).values(senha=request.new_password))
    else:
        db.execute(update(models.Funcionario).where(models.Funcionario.id == request.id).values(senha=request.new_password))
    db.commit()
    return {"message": "password successfully changed!"}
