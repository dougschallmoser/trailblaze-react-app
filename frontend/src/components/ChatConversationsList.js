import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import ChatNewConversationForm from './ChatNewConversationForm';
import ChatMessagesArea from './ChatMessagesArea';
import ChatConversation from './ChatConversation';
import ChatCable from './ChatCable';

class ChatConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => this.setState({ conversations }));
  };

  handleClick = (id) => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

  render = () => {
    const { conversations, activeConversation } = this.state;
    return (
      <>
        <div className="conversationsList">
          <ActionCableConsumer
            channel={{ channel: 'ConversationsChannel' }}
            onReceived={this.handleReceivedConversation}
          />
          {this.state.conversations.length ? (
            <ChatCable
              conversations={conversations}
              handleReceivedMessage={this.handleReceivedMessage}
            />
          ) : null}
          <h2>Messages</h2>
          {mapConversations(conversations, this.handleClick)}
        </div>
        <div>
          <ChatNewConversationForm />
          {activeConversation ? (
            <ChatMessagesArea
              conversation={findActiveConversation(
                conversations,
                activeConversation
              )}
            />
          ) : null}
        </div>
      </>
    );
  };
}

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <div className="conversation-item" key={conversation.id} onClick={() => handleClick(conversation.id)}>
        <ChatConversation conversation={conversation} />
      </div>
    )
  })
}

export default ChatConversationsList;