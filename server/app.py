#!/usr/bin/env python3
from flask import Blueprint, request, make_response
from flask_restful import Resource, Api
from flask_cors import CORS

import os

from config import app, db, api
from models import Account, Product, Order, OrderProductAssociation

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

@app.route('/')
def index():
    return '<h1>Prosper Co. Server</h1>'

# Views go here!
class Accounts(Resource):
    def get(self, id = None):
        if id:
            account = Account.query.filter_by(id = id).first()

            if account:
                return make_response(account.to_dict(), 200)
            else:
                return make_response({'error': 'Account not found'}, 404)
        else:
            accounts = Account.query.all()
            return make_response([account.to_dict() for account in accounts], 200)

    def post(self):
        new_account = Account(**request.json)
        db.session.add(new_account)
        db.session.commit()
        return make_response(new_account.to_dict(), 201)

    def patch(self, id):
        account = Account.query.filter_by(id = id).first()

        if account:
            for key, value in request.json.items():
                setattr(account, key, value)
                db.session.commit()
                return make_response(account.to_dict(), 200)
        else:
            return make_response({'error': 'Account not found'})
        
    def delete(self, id):
        account = Account.query.filter_by(id = id).first()

        if account:
            db.session.delete(account)
            db.session.commit()
            return make_response({'result': 'Account deleted'}, 200)
        else:
            return make_response({'error': 'Account not found'}, 404)


class Products(Resource):
    def get(self, id = None):
        if id:
            product = Product.query.filter_by(id = id).first()

            if product:
                return make_response(product.to_dict(), 200)
            else:
                return make_response({'error': 'Product not found'}, 404)
        else:
            products = Product.query.all()
            return make_response([product.to_dict() for product in products], 200)

    def post(self):
        new_product = Product(**request.json)
        db.session.add(new_product)
        db.session.commit()
        return make_response(new_product.to_dict(), 201)

    def patch(self, id):
        product = Product.query.filter_by(id = id).first()

        if product:
            for key, value in request.json.items():
                setattr(product, key, value)
                db.session.commit()
                return make_response(product.to_dict(), 200)
        else:
            return make_response({'error': 'Product not found'})

    def delete(self, id):
        product = Product.query.filter_by(id = id).first()

        if product:
            db.session.delete(product)
            db.session.commit()
            return make_response({'result': 'Product deleted'}, 200)
        else:
            return make_response({'error': 'Product not found'}, 404)


class Orders(Resource):
    def get(self, id = None):
        if id:
            order = Order.query.filter_by(id = id).first()

            if order:
                return make_response(order.to_dict(), 200)
            else:
                return make_response({'error': 'Order not found'}, 404)
        else:
            orders = Order.query.all()
            return make_response([order.to_dict() for order in orders], 200)

    def post(self):
        new_order = Order(**request.json)
        db.session.add(new_order)
        db.session.commit()
        return make_response(new_order.to_dict(), 201)

    def patch(self, id):
        order = Order.query.filter_by(id = id).first()

        if order:
            for key, value in request.json.items():
                setattr(order, key, value)
                db.session.commit()
                return make_response(order.to_dict(), 200)
        else:
            return make_response({'error': 'Order not found'})
        
    def delete(self, id):
        order = Order.query.filter_by(id = id).first()

        if order:
            db.session.delete(order)
            db.session.commit()
            return make_response({'result': 'Order deleted'}, 200)
        else:
            return make_response({'error': 'Order not found'}, 404)
        

class OrderProductAssociations (Resource):
    def get(self, id = None):
        if id:
            join = OrderProductAssociation.query.filter_by(id = id).first()

            if join:
                return make_response(join.to_dict(), 200)
            else:
                return make_response({'error': 'Join not found'}, 404)
        else:
            joins = OrderProductAssociation.query.all()
            return make_response([join.to_dict() for join in joins], 200)

    def post(self):
        new_join = OrderProductAssociation(**request.json)
        db.session.add(new_join)
        db.session.commit()
        return make_response(new_join.to_dict(), 201)

    def patch(self, id):
        join = OrderProductAssociation.query.filter_by(id = id).first()

        if join:
            for key, value in request.json.items():
                setattr(join, key, value)
                db.session.commit()
                return make_response(join.to_dict(), 200)
        else:
            return make_response({'error': 'Join not found'})
        
    def delete(self, id):
        join = OrderProductAssociation.query.filter_by(id = id).first()

        if join:
            db.session.delete(join)
            db.session.commit()
            return make_response({'result': 'Join deleted'}, 200)
        else:
            return make_response({'error': 'Join not found'}, 404)


api.add_resource(Accounts, '/accounts', '/api/accounts/<int:id>')
api.add_resource(Products, '/products', '/api/products/<int:id>')
api.add_resource(Orders, '/orders', '/api/orders/<int:id>')
api.add_resource(OrderProductAssociations, '/api/associations', '/associations/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

