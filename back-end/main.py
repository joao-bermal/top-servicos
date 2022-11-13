from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import crud
from crud import models, schemas
from database import SessionLocal, engine

# models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
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

@app.get("/empresas/", response_model=list[schemas.Empresa])
def get_empresas(db: Session = Depends(get_db)):
    return crud.get_empresas(db=db)

@app.get("/funcionarios/", response_model=list[schemas.Funcionario])
def get_funcionarios(db: Session = Depends(get_db)):
    return crud.get_funcionarios(db=db)

@app.get("/processos/", response_model=list[schemas.Processo])
def get_processos(db: Session = Depends(get_db)):
    return crud.get_processos(db=db)

@app.post("/add-empresa/", response_model=schemas.Empresa)
def add_empresa(empresa: schemas.EmpresaCreate, db: Session = Depends(get_db)):
    return crud.create_empresa(db=db, empresa=empresa)

@app.post("/add-funcionario/", response_model=schemas.Funcionario)
def add_funcionario(funcionario: schemas.FuncionarioCreate, db: Session = Depends(get_db)):
    return crud.create_funcionario(db=db, funcionario=funcionario)

@app.post("/add-processo/", response_model=schemas.Processo)
def add_processo(processo: schemas.ProcessoCreate, db: Session = Depends(get_db)):
    empresa_id = crud.get_empresa_id_by_cnpj(db, cnpj=processo.empresa_cnpj)
    funcionario_id = crud.get_funcionario_id_by_cpf(db, cpf=processo.funcionario_cpf)

    return crud.create_processo(db=db, processo=processo, empresa_id=empresa_id, funcionario_id=funcionario_id)


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
