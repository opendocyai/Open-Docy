"""
Projectname: open_docy
Author: Open Docy contributors
Create: 2025/6/10
Last Modified: 2025/6/10
Last Editor:
Filename: _response
Description: 
"""
from typing import Optional, List, Dict, Union
from fastapi import status as http_status
from pydantic import BaseModel


class PreResponse:

    @staticmethod
    def format(data: Optional[Union[Dict, List, BaseModel]] = None,
               msg: Optional[str] = 'operation success.',
               status: Optional[str] = 'success',
               code: Optional[int] = http_status.HTTP_200_OK,
               ):
        return {
            'data': data,
            'msg': msg,
            'status': status,
            'code': code
        }


pre_response = PreResponse()