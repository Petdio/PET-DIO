package com.ssafy.petdio.model.Enum;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;


@Getter
public enum Prompt {
    STICKER(1L,
            "(Sticker An adorable cute breed in the photo that provided),(Same pose as the provided photo," +
                    " photo provided as close to the provided photo as possible, refer to the photo.)," +
                    "((Different every time)), (Different every time)," +
                    " (Every time make different, not the same photo,different photo)," +
                    "((Every time make different, not the same photo,different photo))" +
                    "breed in the photo that provided, stickers, " +
                    "adorable, lovely, 3D vector art, cute and quirky, watercolor effect, bokeh, Adobe Illustrator ," +
                    " hand-drawn, digital painting, low-poly, low-lighting, bird's-eye view, isometric style, character-focused," +
                    " 4K resolution, photorealistic rendering, using Cinema 4D,\n"
                    + "sticker, cartoon breed in the photo that provided sticker, all white background, Vermeer style, " +
                    "12K, high quality, HD, octane render, cinematic lighting, sticker format, sticker shape," +
                    "Different every time, When making, Different every time I make a photo, not same", "negative_prompt\", \"nude, nsfw, text, letters, too many feet, too many fingers, \" +\n"
            + "\"(((2 heads))), duplicate, abstract, disfigured, deformed, toy, figure, framed, disfigured, bad art, \" +\n"
            + "\"deformed, poorly drawn, extra limbs, weird colors, 2 heads, long neck, elongated body, cropped image, \" +\n"
            + "\"out of frame, draft, deformed hands, twisted fingers, double image, malformed hands, \" +\n"
            + "\"multiple heads, extra limb, ugly, poorly drawn hands, missing limb, cut-off, over satured, grain, lowères,\" +\n"
            + "\" bad anatomy, poorly drawn face, mutation, mutated, floating limbs, disconnected limbs,\" +\n"
            + "\" out of focus, long body, disgusting, extra fingers, groos proportions, missing arms, mutated hands, \" +\n"
            + "\"cloned face, missing legs,"),
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
            "out of frame, cropped, bad proportions, out of frame, bad anatomy, poorly drawn face, morbid, " +
                    "mutilated,((extra eyes)), ((extra arms)), ((extra legs)), ((extra fingers)), " +
                    "((extra headphones)), ((two headphones)), ((extra heads)), ((extra eyes)) (((2 heads))), " +
                    "duplicate,  blurry, abstract, disfigured, deformed, disfigured, bad art, deformed, " +
                    "poorly drawn,elongated body, cropped image,out of frame,draft,deformed hands, " +
                    "twisted fingers, double image, malformed hands, multiple heads, extra limb, ugly, " +
                    "poorly drawn hands, missing limb, cut-off, over satured, grain, lowères, bad anatomy, " +
                    "poorly drawn face, mutation, mutated, floating limbs, disconnected limbs"),
    MINI(4L,
            "cute tiny hyperrealistic Anime brown breed the photo that provided, adorable and fluffy, logo design, cartoon, " +
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
    CHRISTMAS(5L,"cute stickers, 8K Ultra HD, highly detailed, Detailed illustration of a cute breed enjoying christmas"+
            "illustration Kawaii breed in black punk rock amour," +
                    "character design, vector art, fantasy art, T-shirt design, " +
            " handcuffed to a cross,sticker, playing with a small ball of ruby,surrounded by presents, " +
            "under a mistletoe, Christmas , side view, Svg sticker, clean white background, " +
            "professional vector, high detail, t-shirt design, graffiti, vibrant, Stylized Sticker"
            +" Super Deformed Character, full body, Cute Design, Two-Dimensional, Character Design, Adorable Characters," +
            " Mascot Characters, Adobe Illustrator, A digital illustration of anime style , " +
            "soft anime tones, luminism, Feeling like Kyoto Animation, pixiv, luminism, 3d render, octane render, " +
            "Isometric, by yukisakura, awesome full color,"+
            "Feeling like Kyoto Animation, pixiv, luminism, 3d render, octane render, Isometric, by yukisakura, awesome full color,","");




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
