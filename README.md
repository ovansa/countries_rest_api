# Countries Rest API

This project demonstrates the knowledge of building backend APIs with Nodejs and MongoDB.

PS: This is for learning purpose.

## API Reference

#### Get all countries

```http
  GET /api/v1/countries
```

| Parameter | Type   | Description |
| :-------- | :----- | :---------- |
| `None`    | `none` | None        |

#### Get single country

```http
  GET /api/v1/countries/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of country to fetch |

## Installation

Install my-project with npm

```bash
  git clone project

  cd project

  yarn install
```
