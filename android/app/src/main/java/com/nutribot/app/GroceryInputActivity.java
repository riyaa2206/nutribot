package com.nutribot.app;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.GridLayoutManager;

import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.card.MaterialCardView;
import com.google.android.material.textfield.TextInputEditText;

import android.widget.LinearLayout;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class GroceryInputActivity extends AppCompatActivity {

    private TextInputEditText etGroceryList;
    private TextInputEditText etSingleItem;
    private MaterialButton btnAddFromList;
    private MaterialButton btnAddSingleItem;
    private MaterialButton btnClearAll;
    private MaterialButton btnContinueMealPlanning;
    private MaterialButton btnTakePhoto;
    private MaterialButton btnChooseGallery;
    private MaterialButton btnOpenAIChat;
    
    private MaterialCardView cardTextInput;
    private MaterialCardView cardPhotoUpload;
    private MaterialCardView cardAIChat;
    private MaterialCardView cardGroceryItems;
    
    private LinearLayout textInputSection;
    private LinearLayout photoUploadSection;
    private LinearLayout aiChatSection;
    
    private TextView tvYourIngredients;
    private RecyclerView rvGroceryItems;
    
    private List<String> groceryItems;
    private GroceryItemsAdapter adapter;
    
    private enum InputMode {
        TEXT, PHOTO, AI_CHAT
    }
    
    private InputMode currentMode = InputMode.TEXT;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_grocery_input);

        groceryItems = new ArrayList<>();
        
        initializeViews();
        setupToolbar();
        setupInputModeCards();
        setupTextInput();
        setupPhotoUpload();
        setupAIChat();
        setupGroceryItemsList();
    }

    private void initializeViews() {
        etGroceryList = findViewById(R.id.etGroceryList);
        etSingleItem = findViewById(R.id.etSingleItem);
        btnAddFromList = findViewById(R.id.btnAddFromList);
        btnAddSingleItem = findViewById(R.id.btnAddSingleItem);
        btnClearAll = findViewById(R.id.btnClearAll);
        btnContinueMealPlanning = findViewById(R.id.btnContinueMealPlanning);
        btnTakePhoto = findViewById(R.id.btnTakePhoto);
        btnChooseGallery = findViewById(R.id.btnChooseGallery);
        btnOpenAIChat = findViewById(R.id.btnOpenAIChat);
        
        cardTextInput = findViewById(R.id.cardTextInput);
        cardPhotoUpload = findViewById(R.id.cardPhotoUpload);
        cardAIChat = findViewById(R.id.cardAIChat);
        cardGroceryItems = findViewById(R.id.cardGroceryItems);
        
        textInputSection = findViewById(R.id.textInputSection);
        photoUploadSection = findViewById(R.id.photoUploadSection);
        aiChatSection = findViewById(R.id.aiChatSection);
        
        tvYourIngredients = findViewById(R.id.tvYourIngredients);
        rvGroceryItems = findViewById(R.id.rvGroceryItems);
    }

    private void setupToolbar() {
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }
        toolbar.setNavigationOnClickListener(v -> onBackPressed());
    }

    private void setupInputModeCards() {
        cardTextInput.setOnClickListener(v -> switchInputMode(InputMode.TEXT));
        cardPhotoUpload.setOnClickListener(v -> switchInputMode(InputMode.PHOTO));
        cardAIChat.setOnClickListener(v -> switchInputMode(InputMode.AI_CHAT));
        
        switchInputMode(InputMode.TEXT);
    }

    private void switchInputMode(InputMode mode) {
        currentMode = mode;
        
        // Hide all sections
        textInputSection.setVisibility(View.GONE);
        photoUploadSection.setVisibility(View.GONE);
        aiChatSection.setVisibility(View.GONE);
        
        // Show selected section
        switch (mode) {
            case TEXT:
                textInputSection.setVisibility(View.VISIBLE);
                break;
            case PHOTO:
                photoUploadSection.setVisibility(View.VISIBLE);
                break;
            case AI_CHAT:
                aiChatSection.setVisibility(View.VISIBLE);
                break;
        }
    }

    private void setupTextInput() {
        btnAddFromList.setOnClickListener(v -> {
            String text = etGroceryList.getText() != null ? etGroceryList.getText().toString() : "";
            if (!text.trim().isEmpty()) {
                String[] items = text.split("[,\\n]+");
                for (String item : items) {
                    String trimmed = item.trim();
                    if (!trimmed.isEmpty()) {
                        groceryItems.add(trimmed);
                    }
                }
                etGroceryList.setText("");
                updateGroceryItemsList();
            }
        });

        btnAddSingleItem.setOnClickListener(v -> addSingleItem());
        
        etSingleItem.setOnEditorActionListener((v, actionId, event) -> {
            addSingleItem();
            return true;
        });
    }

    private void addSingleItem() {
        String item = etSingleItem.getText() != null ? etSingleItem.getText().toString().trim() : "";
        if (!item.isEmpty()) {
            groceryItems.add(item);
            etSingleItem.setText("");
            updateGroceryItemsList();
        }
    }

    private void setupPhotoUpload() {
        btnTakePhoto.setOnClickListener(v -> {
            Toast.makeText(this, "Camera feature coming soon!", Toast.LENGTH_SHORT).show();
        });

        btnChooseGallery.setOnClickListener(v -> {
            Toast.makeText(this, "Gallery feature coming soon!", Toast.LENGTH_SHORT).show();
        });
    }

    private void setupAIChat() {
        btnOpenAIChat.setOnClickListener(v -> {
            Intent intent = new Intent(GroceryInputActivity.this, AIChatActivity.class);
            startActivity(intent);
        });
    }

    private void setupGroceryItemsList() {
        adapter = new GroceryItemsAdapter(groceryItems, position -> {
            groceryItems.remove(position);
            updateGroceryItemsList();
        });
        
        rvGroceryItems.setAdapter(adapter);
        rvGroceryItems.setLayoutManager(new GridLayoutManager(this, 3));

        btnClearAll.setOnClickListener(v -> {
            groceryItems.clear();
            updateGroceryItemsList();
        });

        btnContinueMealPlanning.setOnClickListener(v -> {
            Intent intent = new Intent(GroceryInputActivity.this, MealPlanningActivity.class);
            intent.putStringArrayListExtra("groceryItems", new ArrayList<>(groceryItems));
            startActivity(intent);
        });
    }

    private void updateGroceryItemsList() {
        if (groceryItems.isEmpty()) {
            cardGroceryItems.setVisibility(View.GONE);
        } else {
            cardGroceryItems.setVisibility(View.VISIBLE);
            tvYourIngredients.setText(getString(R.string.your_ingredients, groceryItems.size()));
            adapter.notifyDataSetChanged();
        }
    }
}
