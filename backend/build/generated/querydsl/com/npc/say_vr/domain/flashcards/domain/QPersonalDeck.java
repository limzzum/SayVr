package com.npc.say_vr.domain.flashcards.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPersonalDeck is a Querydsl query type for PersonalDeck
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPersonalDeck extends EntityPathBase<PersonalDeck> {

    private static final long serialVersionUID = -876810146L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPersonalDeck personalDeck = new QPersonalDeck("personalDeck");

    public final QFlashcardDeck flashcardDeck;

    public final NumberPath<Integer> forkCount = createNumber("forkCount", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<com.npc.say_vr.domain.flashcards.constant.FlashcardStatus> status = createEnum("status", com.npc.say_vr.domain.flashcards.constant.FlashcardStatus.class);

    public final ListPath<DeckTag, QDeckTag> tags = this.<DeckTag, QDeckTag>createList("tags", DeckTag.class, QDeckTag.class, PathInits.DIRECT2);

    public final com.npc.say_vr.domain.user.domain.QUser user;

    public QPersonalDeck(String variable) {
        this(PersonalDeck.class, forVariable(variable), INITS);
    }

    public QPersonalDeck(Path<? extends PersonalDeck> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPersonalDeck(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPersonalDeck(PathMetadata metadata, PathInits inits) {
        this(PersonalDeck.class, metadata, inits);
    }

    public QPersonalDeck(Class<? extends PersonalDeck> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.flashcardDeck = inits.isInitialized("flashcardDeck") ? new QFlashcardDeck(forProperty("flashcardDeck"), inits.get("flashcardDeck")) : null;
        this.user = inits.isInitialized("user") ? new com.npc.say_vr.domain.user.domain.QUser(forProperty("user")) : null;
    }

}

