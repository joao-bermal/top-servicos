import os
import random
from typing import List

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import crud
from crud import models, schemas
from database import SessionLocal, engine
from utils import email

load_dotenv(".env")

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    os.environ["FRONTEND_DEV_ADDRESS"],
    os.environ["FRONTEND_PROD_ADDRESS"]
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/login-empresa/", response_model=schemas.Empresa)    
def authenticate(empresa: schemas.EmpresaBase, db: Session = Depends(get_db)):
    user = crud.authenticate_empresa(cnpj=empresa.cnpj, senha=empresa.senha, db=db)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/login-funcionario/", response_model=schemas.Funcionario)    
def authenticate(funcionario: schemas.FuncionarioBase, db: Session = Depends(get_db)):
    user = crud.authenticate_funcionario(cpf=funcionario.cpf, senha=funcionario.senha, db=db)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/empresas-all-info/", response_model=list[schemas.Empresa])
def get_all_empresas_info(db: Session = Depends(get_db)):
    return crud.get_all_empresas_info(db=db)

@app.get("/empresas-nome-cnpj/", response_model=list[schemas.EmpresaNomeCnpj])
def get_empresas_nome_cnpj(db: Session = Depends(get_db)):
    return crud.get_empresas_nome_cnpj(db=db)

@app.get("/empresa/{id}", response_model=schemas.Empresa)
def get_empresa_by_id(id: int, db: Session = Depends(get_db)):
    return crud.get_empresa_by_id(id=id, db=db)

@app.get("/funcionarios/", response_model=list[schemas.Funcionario])
def get_funcionarios(db: Session = Depends(get_db)):
    return crud.get_funcionarios(db=db)

@app.get("/funcionario/{id}", response_model=schemas.Funcionario)
def get_funcionario_by_id(id: int, db: Session = Depends(get_db)):
    return crud.get_funcionario_by_id(id=id, db=db)

@app.get("/advogados/", response_model=list[schemas.FuncionarioAdvogado])
def get_advogados(db: Session = Depends(get_db)):
    return crud.get_advogados(db=db)

@app.get("/advogados-nome-cpf/", response_model=list[schemas.FuncionarioNomeCpf])
def get_advogados_nome_cpf(db: Session = Depends(get_db)):
    return crud.get_advogados_nome_cpf(db=db)

@app.get("/advogados-all-info/", response_model=list[schemas.Funcionario])
def get_all_advogados_info(db: Session = Depends(get_db)):
    return crud.get_all_advogados_info(db=db)

@app.get("/processos/", response_model=list[schemas.Processo])
def get_processos(db: Session = Depends(get_db)):
    return crud.get_processos(db=db)
    
@app.get("/processos-em-andamento/", response_model=list[schemas.Processo])
def get_processos(db: Session = Depends(get_db)):
    return crud.get_processos_em_andamento(db=db)

@app.get("/processos-em-andamento-cnpj/{id}", response_model=list[schemas.Processo])
def get_processos_em_andamento_by_cnpj(id: int, db: Session = Depends(get_db)):
    empresa_cnpj = crud.get_empresa_cnpj_by_id(db=db, id=id)
    return crud.get_processos_em_andamento_by_cnpj(db=db, empresa_cnpj=empresa_cnpj)

@app.get("/processos-em-andamento-cpf/{id}", response_model=list[schemas.Processo])
def get_processos_em_andamento_by_cpf(id: int, db: Session = Depends(get_db)):
    advogado_cpf = crud.get_funcionario_cpf_by_id(db=db, id=id)
    return crud.get_processos_em_andamento_by_cpf(db=db, advogado_cpf=advogado_cpf)

@app.get("/processos-finalizados/", response_model=list[schemas.Processo])
def get_processos(db: Session = Depends(get_db)):
    return crud.get_processos_finalizados(db=db)

@app.get("/processos-finalizados-cnpj/{id}", response_model=list[schemas.Processo])
def get_processos_finalizados_by_cnpj(id: int, db: Session = Depends(get_db)):
    empresa_cnpj = crud.get_empresa_cnpj_by_id(db=db, id=id)
    return crud.get_processos_finalizados_by_cnpj(db=db, empresa_cnpj=empresa_cnpj)

@app.get("/processos-finalizados-cpf/{id}", response_model=list[schemas.Processo])
def get_processos_finalizados_by_cpf(id: int, db: Session = Depends(get_db)):
    advogado_cpf = crud.get_funcionario_cpf_by_id(db=db, id=id)
    return crud.get_processos_finalizados_by_cpf(db=db, advogado_cpf=advogado_cpf)

@app.post("/add-empresa/", response_model=schemas.Empresa)
def add_empresa(empresa: schemas.EmpresaCreate, db: Session = Depends(get_db)):
    return crud.create_empresa(db=db, empresa=empresa)

@app.post("/update-empresa")
def update_empresa_all_fields(empresa: schemas.EmpresaUpdate, db: Session = Depends(get_db)):
    return crud.update_empresa_all_fields(db=db, empresa=empresa)

@app.post("/add-funcionario/", response_model=schemas.Funcionario)
def add_funcionario(funcionario: schemas.FuncionarioCreate, db: Session = Depends(get_db)):
    return crud.create_funcionario(db=db, funcionario=funcionario)

@app.post("/update-funcionario")
def update_funcionario(funcionario: schemas.FuncionarioUpdate, db: Session = Depends(get_db)):
    return crud.update_funcionario(db=db, funcionario=funcionario)

@app.post("/add-processo/", response_model=schemas.Processo)
def add_processo(processo: schemas.ProcessoCreate, db: Session = Depends(get_db)):
    return crud.create_processo(db=db, processo=processo)

@app.put("/update_processo/{id}", response_model=list[schemas.Processo])
def update_processo(id: int, processo: schemas.ProcessoUpdate, db: Session = Depends(get_db)):
    return crud.update_processo(db=db, processo=processo, id=id)

@app.put("/update-advogado/{id}", response_model=list[schemas.Funcionario])
def update_advogado(id: int, advogado: schemas.ProcessoUpdate, db: Session = Depends(get_db)):
    return crud.update_advogado(db=db, advogado=advogado, id=id)

@app.put("/update-empresa/{id}", response_model=list[schemas.Empresa])
def update_empresa(id: int, empresa: schemas.ProcessoUpdate, db: Session = Depends(get_db)):
    return crud.update_empresa(db=db, empresa=empresa, id=id)

@app.delete("/delete-processo/{id}", response_model=list[schemas.Processo])
def delete_processo(id: int, db: Session = Depends(get_db)):
    return crud.delete_processo(db=db, id=id)

@app.delete("/delete-advogado/{id}", response_model=list[schemas.Funcionario])
def delete_advogado(id: int, db: Session = Depends(get_db)):
    return crud.delete_advogado(db=db, id=id)

@app.delete("/delete-processos/")
def delete_processos(listProcessos: List[int] = Query(None), db: Session = Depends(get_db)):
    return crud.delete_processos(db=db, listProcessos=listProcessos)

@app.delete("/delete-advogados/")
def delete_advogados(listAdvogados: List[int] = Query(None), db: Session = Depends(get_db)):
    return crud.delete_advogados(db=db, listAdvogados=listAdvogados)

@app.post("/auth/forgot-password")
def forgot_password(request: schemas.ForgotPassword, db: Session = Depends(get_db)):
    mail = ""
    if request.user_type == "Funcionário":
        mail = crud.get_email_by_cpf(db=db, cpf=request.cpf_cnpj)
    elif request.user_type == "Empresa":
        mail = crud.get_email_by_cnpj(db=db, cnpj=request.cpf_cnpj)
    else:
        raise HTTPException(status_code=404, detail="User not found.")
    reset_code = str(random.randint(1000,9999))
    crud.create_reset_code(db=db, email=mail, reset_code=reset_code)

    email.send_email(mail, reset_code)

    return reset_code

@app.post("/auth/reset-password")
def reset_password(request: schemas.ResetPassword, db: Session = Depends(get_db)):
    email = crud.verify_reset_code(db=db, reset_code=request.reset_code)
    if not email:
       raise HTTPException(status_code=401, detail="Unauthorized request.") 

    return crud.reset_password(db=db, email=email, new_password=request.new_password)

@app.post("/auth/update-password")
def update_password(request: schemas.UserUpdatePass, db: Session = Depends(get_db)):
    return crud.update_password(db=db, request=request)