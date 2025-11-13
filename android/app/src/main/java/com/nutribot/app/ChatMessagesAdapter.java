package com.nutribot.app;

import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.card.MaterialCardView;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class ChatMessagesAdapter extends RecyclerView.Adapter<ChatMessagesAdapter.ViewHolder> {

    private final List<ChatMessage> messages;
    private final SimpleDateFormat timeFormat;

    public ChatMessagesAdapter(List<ChatMessage> messages) {
        this.messages = messages;
        this.timeFormat = new SimpleDateFormat("HH:mm", Locale.getDefault());
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_chat_message, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        ChatMessage message = messages.get(position);
        
        holder.tvMessageContent.setText(message.getContent());
        holder.tvMessageTime.setText(timeFormat.format(new Date(message.getTimestamp())));
        
        LinearLayout.LayoutParams params = (LinearLayout.LayoutParams) holder.messageCard.getLayoutParams();
        
        if (message.getType() == ChatMessage.Type.USER) {
            // User message - align right
            params.gravity = Gravity.END;
            holder.messageCard.setCardBackgroundColor(
                ContextCompat.getColor(holder.itemView.getContext(), R.color.primary)
            );
            holder.tvMessageContent.setTextColor(
                ContextCompat.getColor(holder.itemView.getContext(), R.color.white)
            );
            holder.tvMessageTime.setTextColor(
                ContextCompat.getColor(holder.itemView.getContext(), R.color.white)
            );
        } else {
            // AI message - align left
            params.gravity = Gravity.START;
            holder.messageCard.setCardBackgroundColor(
                ContextCompat.getColor(holder.itemView.getContext(), R.color.surface)
            );
            holder.tvMessageContent.setTextColor(
                ContextCompat.getColor(holder.itemView.getContext(), R.color.text_primary)
            );
            holder.tvMessageTime.setTextColor(
                ContextCompat.getColor(holder.itemView.getContext(), R.color.text_muted)
            );
        }
        
        holder.messageCard.setLayoutParams(params);
    }

    @Override
    public int getItemCount() {
        return messages.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        MaterialCardView messageCard;
        TextView tvMessageContent;
        TextView tvMessageTime;

        ViewHolder(View itemView) {
            super(itemView);
            messageCard = itemView.findViewById(R.id.messageCard);
            tvMessageContent = itemView.findViewById(R.id.tvMessageContent);
            tvMessageTime = itemView.findViewById(R.id.tvMessageTime);
        }
    }
}
