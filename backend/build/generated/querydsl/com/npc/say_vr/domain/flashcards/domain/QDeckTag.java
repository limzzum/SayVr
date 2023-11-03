package com.npc.say_vr.domain.flashcards.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDeckTag is a Querydsl query type for DeckTag
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDeckTag extends EntityPathBase<DeckTag> {

    private static final long serialVersionUID = -1754078276L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDeckTag deckTag = new QDeckTag("deckTag");

    public final com.npc.say_vr.global.entity.QBaseEntity _super = new com.npc.say_vr.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final QPersonalDeck personalDeck;

    public final QTag tag;

    public QDeckTag(String variable) {
        this(DeckTag.class, forVariable(variable), INITS);
    }

    public QDeckTag(Path<? extends DeckTag> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDeckTag(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDeckTag(PathMetadata metadata, PathInits inits) {
        this(DeckTag.class, metadata, inits);
    }

    public QDeckTag(Class<? extends DeckTag> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.personalDeck = inits.isInitialized("personalDeck") ? new QPersonalDeck(forProperty("personalDeck"), inits.get("personalDeck")) : null;
        this.tag = inits.isInitialized("tag") ? new QTag(forProperty("tag")) : null;
    }

}

