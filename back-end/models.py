from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base


class Empresa(Base):
    __tablename__ = "empresa"
    id = Column(Integer, primary_key=True, index=True)
    cnpj = Column(String, unique=True)
    razao_social = Column(String)
    telefone = Column(String, unique=True)
    email = Column(String, unique=True)
    senha = Column(String)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())


class Funcionario(Base):
    __tablename__ = "funcionario"
    id = Column(Integer, primary_key=True)
    cpf = Column(String, unique=True)
    nome = Column(String)
    telefone = Column(String, unique=True)
    cargo = Column(String)
    email = Column(String, unique=True)
    senha = Column(String)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())


class Processo(Base):
    __tablename__ = "processo"
    id = Column(Integer, primary_key=True)
    nome = Column(String)
    tipo = Column(String)
    status = Column(String)
    descricao = Column(String)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())
    empresa_id = Column(Integer, ForeignKey("empresa.id"))
    funcionario_id = Column(Integer, ForeignKey("funcionario.id"))

    empresa = relationship("Empresa")
    funcionario = relationship("Funcionario")
