#extracts data from PDFs
from pypdf import PdfReader#library reads pdf file page by page

def extract_text_from_pdf(pdf_path:str)->str:
    reader=PdfReader(pdf_path)#loads pdf into memory
    text=""
    for page in reader.pages:
        text+=page.extract_text()
    return text