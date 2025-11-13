package com.nutribot.app;

import android.os.Bundle;
import android.widget.RadioGroup;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import java.util.ArrayList;

public class MealPlanningActivity extends AppCompatActivity {

    private TextInputEditText etNumberOfDays;
    private TextInputEditText etNumberOfPeople;
    private RadioGroup rgDietaryGoal;
    private MaterialButton btnGeneratePlan;

    private ArrayList<String> groceryItems;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_meal_planning);

        // Get grocery items from intent
        groceryItems = getIntent().getStringArrayListExtra("groceryItems");
        if (groceryItems == null) {
            groceryItems = new ArrayList<>();
        }

        initializeViews();
        setupToolbar();
        setupForm();
    }

    private void initializeViews() {
        etNumberOfDays = findViewById(R.id.etNumberOfDays);
        etNumberOfPeople = findViewById(R.id.etNumberOfPeople);
        rgDietaryGoal = findViewById(R.id.rgDietaryGoal);
        btnGeneratePlan = findViewById(R.id.btnGeneratePlan);
    }

    private void setupToolbar() {
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }
        toolbar.setNavigationOnClickListener(v -> onBackPressed());
    }

    private void setupForm() {
        btnGeneratePlan.setOnClickListener(v -> generateMealPlan());
    }

    private void generateMealPlan() {
        String daysStr = etNumberOfDays.getText() != null ? etNumberOfDays.getText().toString().trim() : "";
        String peopleStr = etNumberOfPeople.getText() != null ? etNumberOfPeople.getText().toString().trim() : "";

        if (daysStr.isEmpty() || peopleStr.isEmpty()) {
            Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        try {
            int days = Integer.parseInt(daysStr);
            int people = Integer.parseInt(peopleStr);

            if (days <= 0 || days > 30) {
                Toast.makeText(this, "Please enter days between 1 and 30", Toast.LENGTH_SHORT).show();
                return;
            }

            if (people <= 0 || people > 10) {
                Toast.makeText(this, "Please enter people between 1 and 10", Toast.LENGTH_SHORT).show();
                return;
            }

            int selectedGoalId = rgDietaryGoal.getCheckedRadioButtonId();
            String goal = "General Health";
            if (selectedGoalId == R.id.rbWeightLoss) {
                goal = "Weight Loss";
            } else if (selectedGoalId == R.id.rbMuscleGain) {
                goal = "Muscle Gain";
            } else if (selectedGoalId == R.id.rbEnergyPerf) {
                goal = "Energy & Performance";
            }

            // Show success message
            String message = String.format(
                    "Generating meal plan for %d days, %d people with %s goal!\n\nUsing %d ingredients.",
                    days, people, goal, groceryItems.size());

            Toast.makeText(this, message, Toast.LENGTH_LONG).show();

            // In a real app, this would call an API to generate the meal plan
            // For now, just show a success message

        } catch (NumberFormatException e) {
            Toast.makeText(this, "Please enter valid numbers", Toast.LENGTH_SHORT).show();
        }
    }
}
