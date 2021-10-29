FROM python:3-slim
WORKDIR /usr/src/app
COPY http.reqs.txt ./
RUN pip install --no-cache-dir -r http.reqs.txt
COPY ./flask/quiz_results.py .
CMD [ "python", "./quiz_results.py" ]
