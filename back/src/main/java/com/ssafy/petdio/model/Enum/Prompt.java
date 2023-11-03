package com.ssafy.petdio.model.Enum;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;


@Getter
public enum Prompt {
    STICKER(1L,
            "(Sticker An adorable cute breed in the photo that provided),breed in the photo that provided, stickers, " +
                    "adorable, lovely, 3D vector art, cute and quirky, watercolor effect, bokeh, Adobe Illustrator ," +
                    " hand-drawn, digital painting, low-poly, low-lighting, bird's-eye view, isometric style, character-focused," +
                    " 4K resolution, photorealistic rendering, using Cinema 4D,\n"
                    + "sticker, cartoon breed in the photo that provided sticker, all white background, Vermeer style, " +
                    "12K, high quality, HD, octane render, cinematic lighting, sticker format, sticker shape," +
                    "Different every time, When making, Different every time I make a photo, not same", ""),
    HALLOWEEN(2L,
            "cute stickers, 8K Ultra HD, highly detailed, Detailed illustration of a cute breed enjoying Halloween, " +
                    "with lots of pumpkins in the background, magic hat, style cartoon, two-dimensional, planar vector, " +
                    "character design, vector art, fantasy art, T-shirt design, Background with light brown gradient, Chibi Chara," +
                    " Super Deformed Character, full body, Cute Design, Two-Dimensional, Character Design, Adorable Characters," +
                    " Mascot Characters, Adobe Illustrator, soft tetrad color, A digital illustration of anime style , " +
                    "soft anime tones, luminism, Feeling like Kyoto Animation, pixiv, luminism, 3d render, octane render, " +
                    "Isometric, by yukisakura, awesome full color,"+
            "Feeling like Kyoto Animation, pixiv, luminism, 3d render, octane render, Isometric, by yukisakura, awesome full color,",
            "negative_prompt\", \"nude, nsfw, text, letters, too many feet, too many fingers, \" +\n"
                    + "\"(((2 heads))), duplicate, abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, \" +\n"
                    + "\"deformed, poorly drawn, extra limbs, weird colors, 2 heads, long neck, elongated body, cropped image, \" +\n"
                    + "\"out of frame, draft, deformed hands, twisted fingers, double image, malformed hands, \" +\n"
                    + "\"multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères,\" +\n"
                    + "\" bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs,\" +\n"
                    + "\" out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, \" +\n"
                    + "\"cloned face, missing legs,"),
    NINJA(3L,
            "A detailed illustration face evil ninja breed the photo that provided,magic, t-shirt design, red color ," +
                    " dark magic splash, dark, ghotic, t-shirt design, in the style of Studio Ghibli, pastel tetradic colors, " +
                    "3D vector art, cute and quirky, fantasy art, watercolor effect, bokeh, Adobe Illustrator, hand-drawn, " +
                    "digital painting, low-poly, soft lighting, bird's-eye view, isometric style, retro aesthetic, " +
                    "focused on the character, 4K resolution, photorealistic rendering, using Cinema 4D",
            "out of frame, cropped, bad proportions, \" +\n"+
                    "\"out of frame, bad anatomy, poorly drawn face, morbid, mutilated,((extra eyes)), \" +\n" +
                    "\"((extra arms)), ((extra legs)), ((extra fingers)), ((extra headphones)), ((two headphones)), \" +\n" +
                    "\"((extra heads)), ((extra eyes)) (((2 heads))), duplicate, man, men, blurry, abstract, disfigured, deformed, \" +\n" +
                    "\"cartoon, animated, toy, figure, framed, 3d, cartoon, 3d, disfigured, bad art, deformed, poorly drawn,\" +\n" +
                    "\" extra limbs, close up, b&w, weird colors, blurry, watermark, blur haze, 2 heads, long neck, watermark, \" +\n" +
                    "\"elongated body, cropped image,out of frame,draft,deformed hands, twisted fingers, double image, \" +\n" +
                    "\"malformed hands, multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, \" +\n" +
                    "\"grain, lowères, bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs, \" +\n" +
                    "\"out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, \" +\n" +
                    "\"cloned face, missing legs"),
    MINI(4L,
            "cute tiny hyperrealistic Anime brown breed the photo that provided, adorable and fluffy, logo design, cartoon, " +
                    "cinematic lighting effect, charming, 3D vector art, cute and quirky, fantasy art, bokeh, hand-drawn, " +
                    "digital painting, soft lighting, isometric style , 4K resolution, photorealistic rendering," +
                    " highly detailed clean, vector image, photorealistic masterpiece, professional photography, " +
                    "simple space backdrop, flat white background, isometric, vibrant vector",
            "negative_prompt\", \"duplicate, blurry, abstract, bad anatomy, bad eyes, crossed eyes,\" +\n" +
                    "                \" disfigured, poorly drawn face, mutation, mutated, ((extra limb)), ugly, two trunks, missing limb, \" +\n" +
                    "                \"floating limbs, disconnected limbs, malformed hands, blur, out of focus, long neck, \" +\n" +
                    "                \"((((mutated hands and fingers)))), (((out of frame))), floating limbs, disconnected limbs, blur, \" +\n" +
                    "                \"out of focus,\" +\n" +
                    "                \" mutated foot, long neck, ((((mutated hands and fingers)))), bad eyes, crossed eyes, disfigured, \" +\n" +
                    "                \"poorly drawn, mutation, mutated, ((extra limb)), ugly, poorly drawn hands, blur, out of focus, long neck, \" +\n" +
                    "                \"long body, two face, out of frame, text, error, cropped, 3 shoes, 3 legs,2 ears, low quality, jpeg artifacts,\" +\n" +
                    "                \"morbid, double image, ugly, disfigured, cut off, ugly, grain, low res, deformed, blurry, bad anatomy, \" +\n" +
                    "                \"disfigured, poorly drawn face, disconnected limbs, mangled, extra fingers, duplicate artifacts, missing arms,\" +\n" +
                    "                \" mutilated hands, cloned face,");



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
