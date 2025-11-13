package com.nutribot.app;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.appbar.MaterialToolbar;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.textfield.TextInputEditText;

import java.util.ArrayList;
import java.util.List;

public class AIChatActivity extends AppCompatActivity {

    private TextInputEditText etChatMessage;
    private FloatingActionButton btnSendMessage;
    private RecyclerView rvChatMessages;
    private ChatMessagesAdapter adapter;
    private List<ChatMessage> messages;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ai_chat);

        initializeViews();
        setupToolbar();
        setupChat();
    }

    private void initializeViews() {
        etChatMessage = findViewById(R.id.etChatMessage);
        btnSendMessage = findViewById(R.id.btnSendMessage);
        rvChatMessages = findViewById(R.id.rvChatMessages);
    }

    private void setupToolbar() {
        MaterialToolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }
        toolbar.setNavigationOnClickListener(v -> onBackPressed());
    }

    private void setupChat() {
        messages = new ArrayList<>();
        
        // Add initial AI greeting
        messages.add(new ChatMessage(
            "Hello! I'm your AI nutrition assistant. I can help you with meal planning, recipe suggestions, nutrition advice, and dietary guidance. What would you like to know about today?",
            ChatMessage.Type.AI,
            System.currentTimeMillis()
        ));

        adapter = new ChatMessagesAdapter(messages);
        rvChatMessages.setAdapter(adapter);
        rvChatMessages.setLayoutManager(new LinearLayoutManager(this));

        btnSendMessage.setOnClickListener(v -> sendMessage());
        
        etChatMessage.setOnEditorActionListener((v, actionId, event) -> {
            sendMessage();
            return true;
        });
    }

    private void sendMessage() {
        String messageText = etChatMessage.getText() != null ? 
                             etChatMessage.getText().toString().trim() : "";
        
        if (messageText.isEmpty()) {
            return;
        }

        // Add user message
        messages.add(new ChatMessage(messageText, ChatMessage.Type.USER, System.currentTimeMillis()));
        adapter.notifyItemInserted(messages.size() - 1);
        rvChatMessages.scrollToPosition(messages.size() - 1);
        
        etChatMessage.setText("");

        // Simulate AI response
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            String aiResponse = generateAIResponse(messageText);
            messages.add(new ChatMessage(aiResponse, ChatMessage.Type.AI, System.currentTimeMillis()));
            adapter.notifyItemInserted(messages.size() - 1);
            rvChatMessages.scrollToPosition(messages.size() - 1);
        }, 1500);
    }

    private String generateAIResponse(String userMessage) {
        String lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.contains("recipe") || lowerMessage.contains("make") || lowerMessage.contains("cook")) {
            return "Based on your request, I found some great recipe options! Here are my top recommendations:\n\n" +
                   "1. Mediterranean Chicken Bowl (25 min, 485 cal, 35g protein)\n" +
                   "2. Veggie Stir-Fry with Rice (20 min, 320 cal, 12g protein)\n\n" +
                   "Each recipe includes detailed nutrition information and cooking instructions.";
        }

        if (lowerMessage.contains("plan") || lowerMessage.contains("week") || lowerMessage.contains("meal prep")) {
            return "I'd be happy to help you create a meal plan! Here's a structured approach:\n\n" +
                   "• Plan 3 main meals + 2 healthy snacks per day\n" +
                   "• Prep proteins in bulk (chicken, beans, tofu)\n" +
                   "• Choose 2-3 base grains (quinoa, rice, oats)\n" +
                   "• Include 5+ different vegetables throughout the week\n" +
                   "• Prepare overnight oats or smoothie packs for quick breakfasts";
        }

        if (lowerMessage.contains("weight loss") || lowerMessage.contains("lose weight") || lowerMessage.contains("diet")) {
            return "For healthy weight management, focus on:\n\n" +
                   "• Prioritize protein (0.8-1g per lb body weight)\n" +
                   "• Fill half your plate with non-starchy vegetables\n" +
                   "• Choose complex carbs like quinoa, sweet potatoes, oats\n" +
                   "• Include healthy fats from nuts, avocado, olive oil\n" +
                   "• Stay hydrated - aim for 8+ glasses of water daily\n" +
                   "• Practice portion control using smaller plates";
        }

        if (lowerMessage.contains("protein") || lowerMessage.contains("muscle")) {
            return "Great choice focusing on protein! Here are excellent high-protein options:\n\n" +
                   "• Greek yogurt with berries and nuts (20g protein)\n" +
                   "• Chicken breast with quinoa and vegetables (35g protein)\n" +
                   "• Lentil soup with whole grain bread (18g protein)\n" +
                   "• Salmon with sweet potato (30g protein)\n" +
                   "• Protein smoothie with banana and spinach (25g protein)\n" +
                   "• Eggs with avocado toast (15g protein)";
        }

        if (lowerMessage.contains("vegetarian") || lowerMessage.contains("vegan") || lowerMessage.contains("plant")) {
            return "Plant-based eating can be incredibly nutritious! Here are some fantastic vegetarian options:\n\n" +
                   "1. Quinoa Buddha Bowl (30 min, 420 cal, 16g protein)\n" +
                   "2. Lentil Curry with Rice (35 min, 380 cal, 18g protein)\n\n" +
                   "These recipes provide complete nutrition and amazing flavors!";
        }

        return "That's a great question! I can help you with meal planning, recipe suggestions, nutrition advice, and dietary guidance. " +
               "Could you tell me more about your specific goals or what you'd like to focus on? " +
               "For example, are you looking for recipes, meal planning help, or nutrition advice?";
    }
}
