package com.npc.say_vr.domain.study.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyDeck is a Querydsl query type for StudyDeck
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyDeck extends EntityPathBase<StudyDeck> {

    private static final long serialVersionUID = -1619693037L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudyDeck studyDeck = new QStudyDeck("studyDeck");

    public final com.npc.say_vr.domain.flashcards.domain.QFlashcardDeck flashcardDeck;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<com.npc.say_vr.global.constant.Status> status = createEnum("status", com.npc.say_vr.global.constant.Status.class);

    public final QStudy study;

    public QStudyDeck(String variable) {
        this(StudyDeck.class, forVariable(variable), INITS);
    }

    public QStudyDeck(Path<? extends StudyDeck> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudyDeck(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudyDeck(PathMetadata metadata, PathInits inits) {
        this(StudyDeck.class, metadata, inits);
    }

    public QStudyDeck(Class<? extends StudyDeck> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.flashcardDeck = inits.isInitialized("flashcardDeck") ? new com.npc.say_vr.domain.flashcards.domain.QFlashcardDeck(forProperty("flashcardDeck"), inits.get("flashcardDeck")) : null;
        this.study = inits.isInitialized("study") ? new QStudy(forProperty("study")) : null;
    }

}

