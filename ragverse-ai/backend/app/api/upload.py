#handels uploaded api request
from fastapi import APIRouter, UploadFile, File
import os

from app.services.pdf_loader import extract_text_from_pdf
from app.services.chunking import chunk_text
from app.services.embeddings import generate_embeddings
from app.services.vector_store import store_embeddings
from app.services.dataset_manager import save_dataset_metadata
from datetime import datetime
router=APIRouter()#fastapi organizes router modularly 
UPLOAD_DIR='uploads'
@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    os.makedirs(UPLOAD_DIR,exist_ok=True)
    file_path=os.path.join(UPLOAD_DIR,file.filename)
    with open(file_path,"wb") as buffer:
        buffer.write(await file.read())
    text=extract_text_from_pdf(file_path)
    chunks=chunk_text(text)
    save_dataset_metadata(
        {
            "filename":
                file.filename,

            "upload_date":
                datetime.now()
                .strftime(
                    "%Y-%m-%d %H:%M"
                ),

            "chunks":
                len(chunks)
        }
    )
    embeddings=generate_embeddings(chunks)
    store_embeddings(chunks,embeddings)

    return {
        "message":"PDF uploaded and processed successfully",
        "filename":file.filename,
        "chunks":len(chunks)
    }
