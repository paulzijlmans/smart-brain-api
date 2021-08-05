FROM postgres:alpine
EXPOSE 5432
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=smart-brain
COPY database/*.sql /docker-entrypoint-initdb.d/