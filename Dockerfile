#base image
FROM python:3.14-slim

#working directory
WORKDIR /Backend

#copy requirements.txt and run dependencies
COPY requirements.txt .

#Run
RUN pip install -r requirements.txt

#Copy
COPY . .

#PORT
EXPOSE 8000

#COMMAND TO RUN APP
CMD [ "uvicorn", "Backend.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload" ]
