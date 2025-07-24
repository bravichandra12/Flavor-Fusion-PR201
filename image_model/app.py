import streamlit as st # type: ignore
from PIL import Image
import torch
from torchvision import transforms
from transformers import ViTFeatureExtractor
from classifier import Classifier  # your custom model class

# List of class labels — update based on your dataset
class_labels = ["apple", "banana", "beetroot", "bell pepper", "cabbage", "capsicum", "carrot", "cauliflower", "chilli pepper", "corn", "cucumber", "eggplant", "garlic", "ginger", "grapes", "jalepeno", "kiwi", "lemon", "lettuce", "mango", "onion", "orange", "paprika", "pear", "peas", "pineapple", "pomegranate", "potato", "raddish", "soy beans", "spinach", "sweetcorn", "sweetpotato", "tomato", "turnip", "watermelon"]

# Load feature extractor
@st.cache_resource
def get_feature_extractor():
    return ViTFeatureExtractor.from_pretrained('google/vit-base-patch16-224')

# Load model
@st.cache_resource
def load_model():
    model = Classifier(n_classes=37)
    model.load_state_dict(torch.load("dataset.pt", map_location="cpu"))
    model.eval()
    return model

# Preprocess image
def preprocess_image(image, feature_extractor):
    inputs = feature_extractor(images=image, return_tensors="pt")
    return inputs["pixel_values"]

# Streamlit UI
st.title("Ingredient Classifier ")

uploaded_file = st.file_uploader("Upload an image of your ingredient.", type=["jpg", "jpeg", "png"])

if uploaded_file:
    image = Image.open(uploaded_file).convert("RGB")
    st.image(image, caption="Uploaded Image", use_column_width=True)

    with st.spinner("Classifying..."):
        extractor = get_feature_extractor()
        model = load_model()
        pixel_values = preprocess_image(image, extractor)

        with torch.no_grad():
            outputs = model(pixel_values)
            probs = torch.nn.functional.softmax(outputs[0], dim=0)
            pred_idx = torch.argmax(probs).item()

    st.success(f"✅ Prediction: **{class_labels[pred_idx]}**")
    st.subheader("🔢 Class Probabilities")
    st.bar_chart({label: float(probs[i]) for i, label in enumerate(class_labels)})
