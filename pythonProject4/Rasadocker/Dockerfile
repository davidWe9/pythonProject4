FROM python:3.10-slim


RUN python -m pip install rasa[spacy]
RUN python -m spacy download de_core_news_lg

COPY rasa .

RUN rasa train --config jetbrains://pycharm/navigate/reference?project=Rasa&path=pythonProject4/Rasadocker/config.yml

ENTRYPOINT ["rasa"]

CMD ["run", "--enable-api", "--cors", "*", "--port", "5005"]
