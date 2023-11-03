package com.npc.say_vr.domain.flashcards.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWordcard is a Querydsl query type for Wordcard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWordcard extends EntityPathBase<Wordcard> {

    private static final long serialVersionUID = 920328431L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWordcard wordcard = new QWordcard("wordcard");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final QFlashcardDeck flashcardDeck;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final EnumPath<com.npc.say_vr.domain.flashcards.constant.WordcardStatus> status = createEnum("status", com.npc.say_vr.domain.flashcards.constant.WordcardStatus.class);

    public final QWord word;

    public QWordcard(String variable) {
        this(Wordcard.class, forVariable(variable), INITS);
    }

    public QWordcard(Path<? extends Wordcard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWordcard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWordcard(PathMetadata metadata, PathInits inits) {
        this(Wordcard.class, metadata, inits);
    }

    public QWordcard(Class<? extends Wordcard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.flashcardDeck = inits.isInitialized("flashcardDeck") ? new QFlashcardDeck(forProperty("flashcardDeck"), inits.get("flashcardDeck")) : null;
        this.word = inits.isInitialized("word") ? new QWord(forProperty("word")) : null;
    }

}

