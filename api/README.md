# API

This directory contains files for the Flask API.

## Usage

First, install the modules it needs:

```sh
pip install mysql-connector-python flask flask-cors
```

Make sure you have MySQL Community Server running on your computer. You will need to know the user + password you set up when installing MySQL.

To run the server, use the following command from the `api` directory:

```sh
MYSQL_USER=<your-mysql-username> MYSQL_PASSWORD=<your-mysql-password> python ./main.py
```
