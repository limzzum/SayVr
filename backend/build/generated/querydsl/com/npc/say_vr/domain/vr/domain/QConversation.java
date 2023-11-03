package com.npc.say_vr.domain.vr.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QConversation is a Querydsl query type for Conversation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QConversation extends EntityPathBase<Conversation> {

    private static final long serialVersionUID = -777249119L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QConversation conversation = new QConversation("conversation");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    public final NumberPath<Integer> conversationContext = createNumber("conversationContext", Integer.class);

    public final NumberPath<Integer> conversationGrammar = createNumber("conversationGrammar", Integer.class);

    public final NumberPath<Integer> conversationPronunciation = createNumber("conversationPronunciation", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final ListPath<Message, QMessage> messageList = this.<Message, QMessage>createList("messageList", Message.class, QMessage.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final StringPath review = createString("review");

    public final StringPath situation = createString("situation");

    public final com.npc.say_vr.domain.user.domain.QUser user;

    public QConversation(String variable) {
        this(Conversation.class, forVariable(variable), INITS);
    }

    public QConversation(Path<? extends Conversation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QConversation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QConversation(PathMetadata metadata, PathInits inits) {
        this(Conversation.class, metadata, inits);
    }

    public QConversation(Class<? extends Conversation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.npc.say_vr.domain.user.domain.QUser(forProperty("user")) : null;
    }

}

