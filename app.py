"""Flask app for Cupcakes"""

from flask import Flask, jsonify, render_template, request

from models import Cupcake, connect_db, db

app = Flask(__name__)

app.secret_key = "123-456-789"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///cupcakes"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

connect_db(app)

with app.app_context():
    db.create_all()


@app.route("/")
def homepage():
    return render_template("home.html")


@app.route("/api/cupcakes", methods=["GET"])
def list_cupcakes():
    """List all cupcakes"""
    print("getting cupcakes!")
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)


@app.route("/api/cupcakes/<int:cupcake_id>", methods=["GET"])
def get_cupcake(cupcake_id):
    """Get cupcake by id"""
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return (jsonify(cupcake=cupcake.serialize()), 201)


@app.route("/api/cupcakes", methods=["POST"])
def create_cupcake():
    """Create cupcake"""

    data = request.json

    cupCake = Cupcake(
        flavor=data["flavor"],
        size=data["size"],
        rating=data["rating"],
        image=data["image"],
    )

    db.session.add(cupCake)
    db.session.commit()

    return {(jsonify(cupcake=cupCake.serialize()), 201)}


@app.route("/api/cupcakes/<int:cupcake_id>", methods=["PATCH"])
def update_cupcake(cupcake_id):
    """Update cupcake"""

    data = request.json

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    cupcake.flavor = data["flavor"]
    cupcake.size = data["size"]
    cupcake.rating = data["rating"]
    cupcake.image = data["image"]

    db.session.add(cupcake)
    db.session.commit()

    return (jsonify(cupcake=cupcake.serialize()), 201)


@app.route("/api/cupcakes/<int:cupcake_id>", methods=["DELETE"])
def delete_cupcake(cupcake_id):
    """Delete cupcake"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return (jsonify(message="Deleted"), 201)
