package com.nutribot.app;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.appbar.MaterialToolbar;

import java.util.ArrayList;
import java.util.List;

public class RecipesActivity extends AppCompatActivity {

    private RecyclerView rvRecipes;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recipes);

        setupToolbar();
        setupRecipesList();
    }

    private void setupToolbar() {
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }
        toolbar.setNavigationOnClickListener(v -> onBackPressed());
    }

    private void setupRecipesList() {
        rvRecipes = findViewById(R.id.rvRecipes);
        
        // Create sample recipes
        List<String> recipes = new ArrayList<>();
        recipes.add("Mediterranean Chicken Bowl");
        recipes.add("Veggie Stir-Fry with Rice");
        recipes.add("Quinoa Buddha Bowl");
        recipes.add("Lentil Curry with Rice");
        recipes.add("Grilled Salmon with Vegetables");
        recipes.add("Pasta Primavera");
        
        // In a real app, this would use a proper RecyclerView adapter
        // For now, it's just a placeholder
        rvRecipes.setLayoutManager(new LinearLayoutManager(this));
    }
}
