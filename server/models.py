from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    address = db.Column(db.String)

    def __repr__(self):
        return f'<Account Name: {self.firstname} {self.lastname} />'


class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    price = db.Column(db.Integer, nullable=False)
    sizes = db.Column(db.String, nullable=False)

    serialize_rules = ('-order.products')

    def __repr__(self):
        return f'<Product {self.name} />'


class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    total = db.Column(db.Float, nullable=False)

    products = db.relationship('Product', cascade = 'all, delete', backref='order')

    serialize_rules = ('-products.order',)

    def __repr__(self):
        return f'<Order To: {self.account.firstname} {self.account.lastname} Total: {self.total}'
