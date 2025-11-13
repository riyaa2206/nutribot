package com.nutribot.app;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.button.MaterialButton;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setupFeatureCards();
        setupStats();
        setupButtons();
    }

    private void setupFeatureCards() {
        // Feature Card 1 - Multiple Input Methods
        View featureCard1 = findViewById(R.id.featureCard1);
        ImageView icon1 = featureCard1.findViewById(R.id.featureIcon);
        TextView title1 = featureCard1.findViewById(R.id.featureTitle);
        TextView desc1 = featureCard1.findViewById(R.id.featureDescription);
        
        icon1.setImageResource(android.R.drawable.ic_input_add);
        title1.setText(R.string.feature_multiple_input);
        desc1.setText(R.string.feature_multiple_input_desc);

        // Feature Card 2 - Custom Timeframes
        View featureCard2 = findViewById(R.id.featureCard2);
        ImageView icon2 = featureCard2.findViewById(R.id.featureIcon);
        TextView title2 = featureCard2.findViewById(R.id.featureTitle);
        TextView desc2 = featureCard2.findViewById(R.id.featureDescription);
        
        icon2.setImageResource(android.R.drawable.ic_menu_my_calendar);
        title2.setText(R.string.feature_custom_timeframes);
        desc2.setText(R.string.feature_custom_timeframes_desc);

        // Feature Card 3 - Smart Recipe Generation
        View featureCard3 = findViewById(R.id.featureCard3);
        ImageView icon3 = featureCard3.findViewById(R.id.featureIcon);
        TextView title3 = featureCard3.findViewById(R.id.featureTitle);
        TextView desc3 = featureCard3.findViewById(R.id.featureDescription);
        
        icon3.setImageResource(android.R.drawable.btn_star_big_on);
        title3.setText(R.string.feature_smart_recipes);
        desc3.setText(R.string.feature_smart_recipes_desc);

        // Feature Card 4 - AI-Powered Assistant
        View featureCard4 = findViewById(R.id.featureCard4);
        ImageView icon4 = featureCard4.findViewById(R.id.featureIcon);
        TextView title4 = featureCard4.findViewById(R.id.featureTitle);
        TextView desc4 = featureCard4.findViewById(R.id.featureDescription);
        
        icon4.setImageResource(android.R.drawable.ic_menu_send);
        title4.setText(R.string.feature_ai_assistant);
        desc4.setText(R.string.feature_ai_assistant_desc);
    }

    private void setupStats() {
        // Stat 1 - Time
        View stat1 = findViewById(R.id.stat1);
        ImageView statIcon1 = stat1.findViewById(R.id.statIcon);
        TextView statValue1 = stat1.findViewById(R.id.statValue);
        TextView statDesc1 = stat1.findViewById(R.id.statDescription);
        
        statIcon1.setImageResource(android.R.drawable.ic_menu_recent_history);
        statValue1.setText(R.string.stat_time);
        statDesc1.setText(R.string.stat_time_desc);

        // Stat 2 - Recipes
        View stat2 = findViewById(R.id.stat2);
        ImageView statIcon2 = stat2.findViewById(R.id.statIcon);
        TextView statValue2 = stat2.findViewById(R.id.statValue);
        TextView statDesc2 = stat2.findViewById(R.id.statDescription);
        
        statIcon2.setImageResource(android.R.drawable.ic_menu_info_details);
        statValue2.setText(R.string.stat_recipes);
        statDesc2.setText(R.string.stat_recipes_desc);

        // Stat 3 - Satisfaction
        View stat3 = findViewById(R.id.stat3);
        ImageView statIcon3 = stat3.findViewById(R.id.statIcon);
        TextView statValue3 = stat3.findViewById(R.id.statValue);
        TextView statDesc3 = stat3.findViewById(R.id.statDescription);
        
        statIcon3.setImageResource(android.R.drawable.star_on);
        statValue3.setText(R.string.stat_satisfaction);
        statDesc3.setText(R.string.stat_satisfaction_desc);
    }

    private void setupButtons() {
        MaterialButton btnStartPlanning = findViewById(R.id.btnStartPlanning);
        MaterialButton btnChatAI = findViewById(R.id.btnChatAI);
        MaterialButton btnGetStarted = findViewById(R.id.btnGetStarted);

        View.OnClickListener groceryInputListener = v -> {
            Intent intent = new Intent(MainActivity.this, GroceryInputActivity.class);
            startActivity(intent);
        };

        btnStartPlanning.setOnClickListener(groceryInputListener);
        btnGetStarted.setOnClickListener(groceryInputListener);

        btnChatAI.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, AIChatActivity.class);
            startActivity(intent);
        });
    }
}
