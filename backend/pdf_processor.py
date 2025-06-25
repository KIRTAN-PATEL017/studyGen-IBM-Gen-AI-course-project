import PyPDF2
import logging
from typing import Optional

class PDFProcessor:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    def extract_text(self, pdf_path: str) -> str:
        """
        Extract text content from a PDF file.
        
        Args:
            pdf_path (str): Path to the PDF file
            
        Returns:
            str: Extracted text content
            
        Raises:
            Exception: If PDF cannot be processed
        """
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text_content = []
                
                # Extract text from each page
                for page_num, page in enumerate(pdf_reader.pages):
                    try:
                        page_text = page.extract_text()
                        if page_text.strip():
                            text_content.append(page_text)
                        self.logger.info(f"Processed page {page_num + 1}")
                    except Exception as e:
                        self.logger.warning(f"Failed to extract text from page {page_num + 1}: {str(e)}")
                        continue
                
                full_text = '\n\n'.join(text_content)
                
                if not full_text.strip():
                    raise Exception("No readable text found in the PDF")
                
                self.logger.info(f"Successfully extracted {len(full_text)} characters from PDF")
                return full_text
                
        except Exception as e:
            self.logger.error(f"Error extracting text from PDF: {str(e)}")
            raise Exception(f"Failed to process PDF: {str(e)}")
    
    def clean_text(self, text: str) -> str:
        """
        Clean and normalize extracted text.
        
        Args:
            text (str): Raw extracted text
            
        Returns:
            str: Cleaned text
        """
        # Remove excessive whitespace
        cleaned = ' '.join(text.split())
        
        # Remove page numbers and headers/footers (basic approach)
        lines = cleaned.split('\n')
        filtered_lines = []
        
        for line in lines:
            line = line.strip()
            # Skip very short lines that might be page numbers
            if len(line) > 3 and not line.isdigit():
                filtered_lines.append(line)
        
        return '\n'.join(filtered_lines)