FROM python:alpine
ENV PYTHONUNBUFFERED=1
WORKDIR /usr/app
ADD ./requirements.txt ./
RUN pip install -r requirements.txt
COPY ./ ./
CMD ["python", "app.py"]