from flask import Blueprint, request, jsonify
from flask_login import login_required
from api.database import SessionLocal
from api.blueprints.gallery.models import GalleryItem, ImageUpload

gallery = Blueprint('gallery', __name__)

GALLERY_DIR = "static/gallery"

@gallery.get("")
def get_gallery():
    session = SessionLocal()
    try:
        # read in a category (filter) selection
        category = request.args.get('category')
        query = session.query(GalleryItem)

        # if a category was selected, filter to select only items that match the category
        if category:
            query = query.filter(GalleryItem.category == category)

        # retrieve a list of GalleryItems matching the current category
        images = query.all()

        # convert GalleryItems to dictionaries returning them as a JSON array
        return jsonify([img.to_dict() for img in images]), 200
    except Exception as e:
        return jsonify({str(e)}), 500
    finally:
        session.close()

@gallery.route('/sign-image', methods=["POST"])
@login_required
def sign_image_signature():
    unsigned_params = request.get_json()
    signed_signature = cloudinary.utils.api_sign_request(unsigned_params, cloudinary.config().api_secret)
    return jsonify({"signature": signed_signature})
    
@gallery.route('/images/del/<public_id>/', methods=["DELETE"])
@login_required
def delete_image(public_id):
    session = SessionLocal()
    cloudinary_response = cloudinary.uploader.destroy(public_id)

    if cloudinary_response.get('result') != "ok":
        return jsonify({"success": False, "message": cloudinary_response }), 400

    image_to_be_deleted = session.scalar(select(GalleryItem).where(GalleryItem.public_id==public_id))
    session.delete(image_to_be_deleted)
    session.commit()
    return jsonify({"success": True, "message": "Image successfully deleted"}), 200

@gallery.route('/images/add', methods=["POST"])
def add_image():
  try: 
    if not request.is_json:
      return jsonify({"success": False, "message": "Invalid JSON"}), 415

    upload_form = request.get_json()
    upload_attempt = ImageUpload.model_validate(upload_form)

    with SessionLocal() as session:
      public_id = upload_attempt.public_id
      category = upload_attempt.category
      title = upload_attempt.title
      description = upload_attempt.description
      src = upload_attempt.src
    
      image = GalleryImage(public_id=public_id, category=category, title=title, description=description, src=src)

      session.add(image)
      session.commit()

  except ValidationError as e:
    return jsonify({"success": False, "message": "Invalid credentials!"}), 400

  except BadRequest:
    return jsonify({"success": False, "message": "Malformed JSON"}), 400
