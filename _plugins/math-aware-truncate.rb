# frozen_string_literal: true

module Jekyll
  module MathAwareTruncateFilter
    ELLIPSIS = '...'
    MATH_PATTERN = /(\$\$.*?\$\$|(?<!\\)\$.*?(?<!\\)\$|\\\[.*?\\\]|\\\(.*?\\\))/m

    def math_aware_truncate(input, max_length = 200)
      text = input.to_s.strip.gsub(/\s+/, ' ')
      limit = max_length.to_i

      return text if limit <= 0 || text.length <= limit

      content_limit = [limit - ELLIPSIS.length, 0].max
      excerpt = +''

      text.split(MATH_PATTERN).reject(&:empty?).each do |part|
        if excerpt.length + part.length <= content_limit
          excerpt << part
        elsif math_token?(part)
          break
        else
          excerpt << truncate_text(part, content_limit - excerpt.length)
          break
        end
      end

      "#{excerpt.rstrip}#{ELLIPSIS}"
    end

    private

    def math_token?(text)
      text.start_with?('$', '\\[', '\\(')
    end

    def truncate_text(text, available)
      return '' if available <= 0

      slice = text[0, available]
      return slice if slice.length == text.length || text[available]&.match?(/\s/)

      slice.sub(/\s+\S*\z/, '')
    end
  end
end

Liquid::Template.register_filter(Jekyll::MathAwareTruncateFilter)
