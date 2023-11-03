package com.npc.say_vr.domain.flashcards.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFlashcardDeck is a Querydsl query type for FlashcardDeck
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFlashcardDeck extends EntityPathBase<FlashcardDeck> {

    private static final long serialVersionUID = 886281492L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFlashcardDeck flashcardDeck = new QFlashcardDeck("flashcardDeck");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final StringPath name = createString("name");

    public final QPersonalDeck personalDeck;

    public final com.npc.say_vr.domain.study.domain.QStudyDeck studyDeck;

    public final ListPath<Wordcard, QWordcard> wordcards = this.<Wordcard, QWordcard>createList("wordcards", Wordcard.class, QWordcard.class, PathInits.DIRECT2);

    public QFlashcardDeck(String variable) {
        this(FlashcardDeck.class, forVariable(variable), INITS);
    }

    public QFlashcardDeck(Path<? extends FlashcardDeck> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFlashcardDeck(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFlashcardDeck(PathMetadata metadata, PathInits inits) {
        this(FlashcardDeck.class, metadata, inits);
    }

    public QFlashcardDeck(Class<? extends FlashcardDeck> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.personalDeck = inits.isInitialized("personalDeck") ? new QPersonalDeck(forProperty("personalDeck"), inits.get("personalDeck")) : null;
        this.studyDeck = inits.isInitialized("studyDeck") ? new com.npc.say_vr.domain.study.domain.QStudyDeck(forProperty("studyDeck"), inits.get("studyDeck")) : null;
    }

}

