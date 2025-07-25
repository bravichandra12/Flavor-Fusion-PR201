import torch.nn as nn
from transformers import ViTForImageClassification

class Classifier(nn.Module):
    def __init__(self, n_classes, dp_rate=0.3):
        super().__init__()
        self.vit = ViTForImageClassification.from_pretrained('google/vit-base-patch16-224')
        self.dropout = nn.Dropout(dp_rate)
        self.out = nn.Linear(1000, n_classes)
        self.num_classes = n_classes

    def forward(self, inputs):
        pooled_output = self.vit(inputs).logits
        output = self.dropout(pooled_output)
        return self.out(output)
