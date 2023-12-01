from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Table

from config import db, Base

# Models go here!
order_product_association = Table(
    'order_product_association',
    Base.metadata,
    db.Column('order_id', db.Integer, db.ForeignKey('orders.id')),
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'))
)

class Account(db.Model, SerializerMixin):
    __tablename__ = 'accounts'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    address = db.Column(db.String)

    orders = db.relationship('Order', cascade='all, delete', backref='account')

    serialize_rules = ('-orders.account')

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
    account_id = db.Column(db.Integer, db.ForeignKey('accounts.id'))
    total = db.Column(db.Float, nullable=False)

    products = db.relationship('Product', secondary=order_product_association, cascade = 'all, delete', backref='order')

    serialize_rules = ('-products.order', '-account.orders')

    def __repr__(self):
        return f'<Order To: {self.account.firstname} {self.account.lastname} Total: {self.total}'
