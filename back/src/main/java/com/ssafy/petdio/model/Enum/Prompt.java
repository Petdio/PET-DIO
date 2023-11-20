package com.ssafy.petdio.model.Enum;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;


@Getter
public enum Prompt {
    SKETCH(1L,

            "(normal picture), ((only blck line and white background)), breed in the picture that provided, image ( breed, white background,) " +
                    "clean line art, fine dark line art--HDS--Ar 2:3" +
                    "(only breed, white background), (Black and white outline art for cute book pages)," +
                    " all white, children's style, white background, whole body, sketch style, " +
                    "((white background)), ((only outlines used)), lines, coloring book, clean lines, " +
                    "background. White, Sketch style, " +
                    "high quality, 8K Ultra HD, hyper-realistic sketch portrait of a breed,precision and accuracy," +

                    "realistic pencil drawing of a breed, [view], face portrait, black and white, breed that provided image, white background, sketch, pencil strokes, pencil lines" ,

            "(long body), nude, nsfw, text, letters, too many feet, (too many fingers), (((2 heads))), duplicate," +
                    " abstract, ((disfigured)), deformed, toy, figure, framed, disfigured, ((bad art)), deformed, poorly drawn, " +
                    "extra limbs, weird colors, (2 heads), (long neck), ((elongated body)), cropped image, out of frame, draft, " +
                    "deformed hands, (twisted fingers), ((double image)), malformed hands, multiple heads, extra limb, ugly, " +
                    "poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face," +
                    " mutation, mutated, floating limbs, disconnected limbs,  out of focus, long body, disgusting, " +
                    "extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,"),
    HALLOWEEN(2L,
            "(normal picture),cute breed stickers, 8K Ultra HD, highly detailed, " +
                    "Detailed illustration of a cute breed enjoying Halloween, with lots of Halloween pumpkins in the background," +
                    "it wear witch hat and hold a book and halloween mood,Halloween Mood Wallpaper " +
                    "magic hat, style cartoon, two-dimensional, planar vector, character design, vector art," +
                    " fantasy art, T-shirt design, Chibi Chara, Super Deformed Character, full body," +
                    " Cute Design, Two-Dimensional, Character Design, Adorable Characters, Mascot Characters," +
                    " Adobe Illustrator, soft tetrad color, A digital illustration of anime style , soft anime tones, " +
                    "luminism, Feeling like Kyoto Animation, pixiv, luminism, 3d render, octane render, Isometric," +
                    " by yukisakura, awesome full color,",

            "nude, nsfw, text, letters, too many feet, too many fingers, " +
                    "(((2 heads))), duplicate, abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, " +
                    "deformed, poorly drawn, extra limbs, weird colors, 2 heads, long neck, elongated body, cropped image, " +
                    "out of frame, draft, deformed hands, twisted fingers, double image, malformed hands, " +
                    "multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères," +
                    " bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs," +
                    " out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, " +
                    "cloned face, missing legs,"),

    NINJA(3L,
            "(normal picture),A detailed illustration face evil ninja breed,magic, t-shirt design, red color , dark magic splash, " +
                    "dark, ghotic, t-shirt design, in the style of Studio Ghibli, pastel tetradic colors, " +
                    "3D vector art, cute and quirky, fantasy art, watercolor effect, bokeh, Adobe Illustrator, " +
                    "hand-drawn, digital painting, low-poly, soft lighting, bird's-eye view, isometric style," +
                    " retro aesthetic, focused on the character, 4K resolution, photorealistic rendering, using Cinema 4D",

            "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid," +
                    " mutilated,((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers)), ((extra headphones)), " +
                    "((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads))), duplicate, man, men, blurry, " +
                    "abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, cartoon, 3d, disfigured," +
                    " bad art, deformed, poorly drawn, extra limbs, close up, b&w, weird colors, blurry, watermark, " +
                    "blur haze, 2 heads, long neck, watermark, elongated body, cropped image,out of frame,draft," +
                    "deformed hands, twisted fingers, double image, malformed hands, multiple heads, extra limb, " +
                    "ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, " +
                    "poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body," +
                    " disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs"),
    MINI(4L,
            "(normal picture),cute tiny hyperrealistic Anime breed photo that provided, adorable and fluffy, logo design, cartoon, " +
                    "((Same breed color as the provided image prompter (image)))"+
                    "cinematic lighting effect, charming, 3D vector art, cute and quirky, fantasy art, bokeh, hand-drawn, " +
                    "digital painting, soft lighting, isometric style , 4K resolution, photorealistic rendering," +
                    " highly detailed clean, vector image, photorealistic masterpiece, professional photography, " +
                    "simple space backdrop, flat white background, isometric, vibrant vector",
            "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid, " +
                    "mutilated,((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers)), " +
                    "((extra headphones)), ((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads))), " +
                    "duplicate,  blurry, abstract, disfigured, deformed, disfigured, bad art, deformed, " +
                    "poorly drawn,elongated body, cropped image,out of frame,draft,deformed hands, " +
                    "twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, " +
                    "poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, " +
                    "poorly drawn face, mutation, mutated, floating limbs, disconnected limbs"),
    SKY(5L,"(normal picture),An artistic portrait of a breed suspended in a blue sky with fluffy clouds," +
            " the breed assumes a majestic pose as if exploring the heavens. Sunlight illuminates the scene, " +
            "creating a radiant image full of life. The expression on the breed face is one of joy " +
            "and bravery as he gazes toward the horizon in this captivating illustration.",

            "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid, mutilated," +
                    "((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers)), ((extra headphones))," +
                    " ((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads))), duplicate, man, men, blurry, " +
                    "abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, cartoon, 3d, disfigured, " +
                    "bad art, deformed, poorly drawn, extra limbs, close up, b&w, weird colors, blurry, watermark, blur haze, " +
                    "2 heads, long neck, watermark, elongated body, cropped image,out of frame,draft,deformed hands, " +
                    "twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, " +
                    "missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face, mutation, mutated," +
                    " floating limbs, disconnected limbs, out of focus, long body, disgusting, extra fingers, groos proportions," +
                    " missing arms, mutated hands, cloned face, missing legs"),

    GOGGLES (6L,"One breed head with ski goggles on eyes, clean nose",
                //One breed, Illustration,cartoon a breed head, with ski goggles in which mountains are reflected,without breed eye

                "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid, mutilated," +
                "((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers)), ((extra headphones))," +
                " ((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads))), duplicate, man, men, blurry, " +
                "abstract, disfigured, deformed, cartoon, animated, toy, figure, framed, 3d, cartoon, 3d, disfigured, " +
                "bad art, deformed, poorly drawn, extra limbs, close up, b&w, weird colors, blurry, watermark, blur haze, " +
                "2 heads, long neck, watermark, elongated body, cropped image,out of frame,draft,deformed hands, " +
                "twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, " +
                "missing limb, cut-off, over satured, grain, lowères, bad anatomy, poorly drawn face, mutation, mutated," +
                " floating limbs, disconnected limbs, out of focus, long body, disgusting, extra fingers, groos proportions," +
                " missing arms, mutated hands, cloned face, missing legs"),

    CHRISTMAS_STICKER (7L,"breed, high quality, 8K Ultra HD, cute stickers, style cartoon, white border, " +
            "Detailed illustration of a cute breed wearing a Santa hat, Bags of many Christmas gifts on the background, " +
            " colorful, pink, orange, blue, yellow, highly detailed, awesome full color, clean eyes, clean nose",

            "multiple arrows, nude, nsfw, too many feet, too many fingers, long neck, 2 heads, duplicate, "
                    + "disfigured, deformed, toy, disfigured, bad art, deformed, poorly drawn, extra limbs, weird colors, "
                    + "2 heads, elongated body, cropped image, out of frame, deformed hands, twisted fingers, malformed hands, "
                    + "multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, lowères, bad anatomy, "
                    + "poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, disgusting, "
                    + "extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,"),

//            "multiple arrows, nude, nsfw, too many feet, too many fingers, long neck, 2 heads, duplicate, disfigured, deformed," +
//                    "toy, disfigured, bad art, deformed, poorly drawn, extra limbs, weird colors, 2 heads, elongated body, cropped image, out of frame, deformed hands, twisted fingers,  " +
//                    " malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, lowères, bad anatomy," +
//                    "poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, " +
//                    "disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,"),

    CHRISTMAS_REALITY (8L,"breed, Generate imaginative Christmas-themed animals: Picture a breed with gift box and santa hat, clean eyes.",

            "multiple arrows, nude, nsfw, too many feet, too many fingers, long neck, 2 heads, duplicate, disfigured, deformed," +
                    "toy, disfigured, bad art, deformed, poorly drawn, extra limbs, weird colors, 2 heads, elongated body, cropped image, out of frame, deformed hands, twisted fingers,  " +
                    " malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, lowères, bad anatomy," +
                    "poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, " +
                    "disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,"),

    MODEL_SKETCH (9L,"realistic pencil drawing of a breed, portrait view, face portrait, black and white, animal," +
            "white background, clean eyes, sketch, pencil strokes, pencil lines",

            "multiple arrows, nude, nsfw, too many feet, too many fingers, long neck, 2 heads, duplicate, disfigured, deformed," +
                    "toy, disfigured, bad art, deformed, poorly drawn, extra limbs, weird colors, 2 heads, elongated body, cropped image, out of frame, deformed hands, twisted fingers,  " +
                    " malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, lowères, bad anatomy," +
                    "poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, out of focus, long body, " +
                    "disgusting, extra fingers, groos proportions, missing arms, mutated hands, cloned face, missing legs,");


    //





    private Long id;
    private String prompt;
    private String negativePrompt;

    private static final Map<Long, Prompt> enumIdMap = new HashMap<>();

    static {
        for (Prompt item : Prompt.values()) {
            enumIdMap.put(item.getId(), item);
        }
    }
    Prompt(Long id, String prompt, String negativePrompt) {
        this.id = id;
        this.prompt = prompt;
        this.negativePrompt = negativePrompt;
    }

    public static Prompt findEnumById(Long id) {
        return enumIdMap.get(id);
    }
}
